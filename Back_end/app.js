const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

const mongoose = require('mongoose');
const axios = require('axios');
const mysql = require('mysql2/promise');
console.log('Connected to PlanetScale!');
const passport = require('passport');

// MySQL 연결 설정
const mysqlConfig = {
  host: '192.168.10.51',
  user: 'admin',
  password: 'admin1@34',
  database: 'Tale.er',
};
const pool = mysql.createPool(mysqlConfig);
const connection = mysql.createConnection(mysqlConfig);

const MongoClient = require('mongodb').MongoClient;
//mongodb 서버주소

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(cors());

// 이미 선언된 session 변수를 사용하도록 수정
app.use(
  session({
    secret: 'ab98122017!@', // 세션의 비밀 키, 원하는대로 변경하세요
    resave: false,
    saveUninitialized: false,
  })
);

//사용자 세션 인증 쿠키
app.use(
  session({
    secret: 'tale.er',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  // user 객체 초기화
  res.locals.user = null;

  // 세션에서 사용자 정보를 가져와서 user 객체 설정
  if (req.session.user) {
    res.locals.user = {
      ID: req.session.user.ID,
      name: req.session.user.name,
      nickname: req.session.user.nickname,
      email: req.session.user.email,
      phone: req.session.user.phone,
      address: req.session.user.address,
      // 필요한 다른 사용자 정보도 추가할 수 있음
    };
  }

  // 다음 미들웨어로 이동
  next();
});

app.get('/', (req, res) => {
  console.log(req.session.member);

  res.render('index');
});

app.get('/mypage', (req, res) => {
  res.render('mypage');
});

app.get('/search', (req, res) => {
  res.render('search');
});

//문의하기
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contactProc', async (req, res) => {
  const { name, phone, email, memo } = req.body;

  try {
    // 쿼리 실행
    const sql = `INSERT INTO contact (name, phone, email, memo, regdate) VALUES (?, ?, ?, ?, NOW())`;
    const values = [name, phone, email, memo];
    const [result] = await pool.query(sql, values);

    console.log('Inserted one record into contact table.');
    res.send(
      "<script>alert('문의사항이 등록되었습니다.'); location.href='/';</script>"
    );
  } catch (error) {
    console.error('Error inserting contact:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/contactList', async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM contact ORDER BY idx DESC');
    res.render('contactList', { lists: results[0] });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/contactDelete', async (req, res) => {
  const idx = req.query.idx;

  try {
    // SQL 쿼리 실행
    const sql = `DELETE FROM contact WHERE idx = ?`;
    const [result] = await pool.query(sql, [idx]);

    console.log('Deleted one record from contact table.');
    res.send(
      "<script>alert('삭제되었습니다.'); location.href='/contactList';</script>"
    );
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Internal Server Error');
  }
});

// MySQL 연결 정보
const MYSQL_HOST = '192.168.100.133';
const MYSQL_USER = 'admin';
const MYSQL_PASSWORD = 'admin1@34';
const MYSQL_DATABASE = 'Tale.er';

// 로그인
app.get('/login', (req, res) => {
  res.render('login');
});

// 로그인 처리
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      // Check if user exists with the provided credentials
      const [users] = await pool.query(
        'SELECT email, name, nickname, phone, gender, address FROM Users_info WHERE email = ? AND password = ?',
        [email, password]
      );

      if (users.length === 1) {
        // User exists and credentials are correct
        // 세션에 사용자 정보를 저장합니다.
        const user = users[0];
        req.session.user = user;
        console.log('Logged in user:', user); // 세션 데이터 출력
        return res.json({ user: req.session.user });
      } else {
        // User does not exist or credentials are incorrect
        return res
          .status(401)
          .json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
    }
  } else {
    return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요.' });
  }
});

// 로그아웃 처리
app.get('/logout', (req, res) => {
  // 세션을 삭제합니다.
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res
        .status(500)
        .json({ error: '세션 삭제 중 오류가 발생했습니다.' });
    }
    // 로그인 페이지로 리다이렉트합니다.
    res.redirect('/login');
  });
});

// 마이페이지 페이지 렌더링
app.get('/mypage', async (req, res) => {
  try {
    // 세션에서 사용자의 정보를 가져옵니다.
    const user = req.session.user;

    // 사용자가 로그인되어 있지 않으면 로그인 페이지로 리다이렉트합니다.
    if (!user) {
      console.log('User is not logged in. Redirecting to login page.');
      return res.redirect('/login');
    }

    // 사용자가 로그인되어 있으면 마이페이지 페이지를 렌더링합니다.
    // 템플릿에 user 정보를 전달하여 렌더링합니다.
    return res.render('mypage', { user: user });
  } catch (error) {
    console.error('Error retrieving user mypage:', error);
    return res
      .status(500)
      .json({ error: '마이페이지을 가져오는 중 오류가 발생했습니다.' });
  }
});

// 마이페이지 업데이트
app.post('/mypage_update', async (req, res) => {
  try {
    // 세션에서 사용자의 정보를 가져옵니다.
    let user = req.session.user;

    // 사용자가 로그인되어 있지 않으면 로그인 페이지로 리다이렉트합니다.
    if (!user) {
      console.log('User is not logged in. Redirecting to login page.');
      return res.redirect('/login');
    }

    // 요청에서 업데이트할 사용자 정보를 가져옵니다.
    const { email, phone, address } = req.body;

    // 새로운 사용자 정보로 업데이트합니다.
    user = {
      ...user,
      email: email || user.email,
      phone: phone || user.phone,
      address: address || user.address,
    };

    // 업데이트된 사용자 정보를 세션에 저장합니다.
    req.session.user = user;

    // Users_info 테이블의 사용자 정보 업데이트
    await pool.query(
      'UPDATE Users_info SET email = ?, phone = ?, address = ? WHERE ID = ?',
      [user.email, user.nickname, user.phone, user.address]
    );

    // mypage 테이블의 사용자 정보 업데이트
    await pool.query(
      'UPDATE mypage SET email = ?, phone = ?, address = ? WHERE ID = ?',
      [user.email, user.phone, user.address]
    );

    // 마이페이지 업데이트가 성공했음을 응답합니다.
    return res
      .status(200)
      .json({ message: '마이페이지이 성공적으로 업데이트되었습니다.' });
  } catch (error) {
    console.error('Error updating user mypage:', error);
    return res
      .status(500)
      .json({ error: '마이페이지을 업데이트하는 중 오류가 발생했습니다.' });
  }
});

// 마이페이지 편집 페이지 렌더링
app.get('/mypage/edit', async (req, res) => {
  try {
    // 세션에서 사용자의 정보를 가져옵니다.
    const user = req.session.user;

    // 사용자가 로그인되어 있지 않으면 로그인 페이지로 리다이렉트합니다.
    if (!user) {
      console.log('User is not logged in. Redirecting to login page.');
      return res.redirect('/login');
    }

    // 마이페이지 편집 페이지를 렌더링합니다.
    return res.render('mypage_edit', { user: user });
  } catch (error) {
    console.error('Error rendering mypage edit page:', error);
    return res.status(500).json({
      error: '마이페이지 편집 페이지를 렌더링하는 중 오류가 발생했습니다.',
    });
  }
});

app.get('/Users_info', (req, res) => {
  res.render('Users_info');
});

// 회원가입 처리
app.post('/Users_infoProc', async (req, res) => {
  const { email, password, name, nickname, phone, gender, address } = req.body;

  // 특수 문자가 포함되어 있는지 확인하기 위한 정규 표현식
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (password && email) {
    try {
      // Check if user ID or email already exists
      const [existingUsers] = await pool.query(
        'SELECT * FROM Users_info WHERE email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        // User ID or email already exists, show a warning message
        res.send(
          '<script>alert("이미 존재하는 이메일입니다."); location.href="/Users_info";</script>'
        );
        return;
      }

      // 특수 문자가 포함되어 있는지 확인
      if (!specialCharacterRegex.test(password)) {
        res.send(
          '<script>alert("비밀번호에는 특수 문자를 최소 한 개 이상 포함해야 합니다."); location.href="/Users_info";</script>'
        );
        return;
      }
      // Check if gender value is valid ENUM value
      const validGenders = ['male', 'female']; // ENUM으로 정의된 값들
      if (!validGenders.includes(gender)) {
        res.send(
          '<script>alert("올바른 성별 값을 입력해주세요."); location.href="/Users_info";</script>'
        );
        return;
      }
      // Proceed with the registration if everything is okay
      await pool.query(
        'INSERT INTO Users_info (email, password, name, nickname, phone, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [email, password, name, nickname, phone, gender, address]
      );

      // Insert user into mypage table
      await pool.query(
        'INSERT INTO mypage (email, name, phone, gender, address) VALUES (?, ?, ?, ?, ?,?,?)',
        [email, name, nickname, phone, gender, address]
      );

      console.log('Inserted one record into Users_info table.');
      console.log('Inserted one record into mypage table.');

      // Set session data for the user
      req.session.user = {
        email,
        password,
        name,
        nickname,
        phone,
        gender,
        address,
        // Add other necessary fields here
      };

      console.log('Session data:', req.session.user); // 세션 데이터 출력
      return res.json({ user: req.session.user });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.send(
        '<script>alert("회원가입 중 오류가 발생했습니다."); location.href="/Users_info";</script>'
      );
    }
  } else {
    return res.send(
      '<script>alert("모든 정보를 입력해주세요."); location.href="/Users_info";</script>'
    );
  }
});

// 관리자 로그인 페이지 렌더링
app.get('/admin/login', (req, res) => {
  res.render('admin_login');
});

// 관리자 로그인 처리
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  // 관리자 인증 로직 수행
  if (username === 'admin' && password === 'adminpassword') {
    // 로그인 성공 시 관리자 대시보드 페이지로 리다이렉트
    res.redirect('/admin/dashboard');
  } else {
    // 로그인 실패 시 에러 메시지 표시
    res.render('admin_login', { error: 'Invalid username or password' });
  }
});

// 관리자 대시보드 페이지 렌더링
app.get('/admin/dashboard', async (req, res) => {
  try {
    // Users_info 테이블에서 사용자 정보 조회
    const [usersResult] = await pool.query(
      'SELECT ID, name, gender, phone, email, address FROM Users_info'
    );
    const users = usersResult.length > 0 ? usersResult : [];

    // subscribers_info 테이블에서 구독자 정보 조회
    const [subscribersResult] = await pool.query(
      'SELECT ID, subscriber_name FROM subscribers_info'
    );
    const subscribers = subscribersResult.length > 0 ? subscribersResult : [];

    res.render('admin_dashboard', { users, subscribers });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.render('admin_dashboard', { error: 'Error fetching data' });
  }
});

app.post('/admin/deleteUser', async (req, res) => {
  const userId = req.body.userId;
  try {
    // 회원 정보 삭제
    await pool.query('DELETE FROM Users_info WHERE ID = ?', [userId]);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.render('admin_dashboard', { error: 'Error deleting user' });
  }
});

app.post('/admin/deleteSubscriber', async (req, res) => {
  const subscriberId = req.body.subscriberId;
  try {
    // 구독자 정보 삭제
    await pool.query('DELETE FROM subscribers_info WHERE ID = ?', [
      subscriberId,
    ]);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    res.render('admin_dashboard', { error: 'Error deleting subscriber' });
  }
});

// 사용자 검색 처리
app.post('/admin/searchUsers', async (req, res) => {
  const searchKeyword = req.body.searchKeyword;
  try {
    // Users_info 테이블에서 검색어와 일치하는 사용자 정보 조회
    const [usersResult] = await pool.query(
      'SELECT ID, name, gender, phone, email, address FROM Users_info WHERE ID = ? OR email = ?',
      [searchKeyword, searchKeyword]
    );
    const users = usersResult.length > 0 ? usersResult : [];

    res.render('admin_dashboard', { users, subscribers: [] });
  } catch (error) {
    console.error('Error searching users:', error);
    res.render('admin_dashboard', { error: 'Error searching users' });
  }
});

app.post('/admin/sendMessageToAll', async (req, res) => {
  const message = req.body.message;
  try {
    // 모든 사용자에게 메시지를 보내는 로직 추가
    // 이 부분은 데이터베이스에서 모든 사용자를 조회하고 각 사용자에게 메시지를 전송하는 로직이 포함됩니다. -> 이 부분을 어떻게 구현할 지 고민중
    res.send('Message sent to all users successfully.');
  } catch (error) {
    console.error('Error sending message to all users:', error);
    res.status(500).send('Error sending message to all users');
  }
});

app.get('/books', async (req, res) => {
  try {
    // MySQL 연결 풀에서 연결 가져오기
    const connection = await pool.getConnection();

    // books 테이블의 모든 책 정보를 조회하는 쿼리 실행
    const [books] = await connection.query('SELECT * FROM books');

    // 랜덤으로 5개의 책 조회
    const [randomRows] = await connection.query(
      'SELECT * FROM books ORDER BY RAND() LIMIT 5'
    );

    // 연결 반환
    connection.release();

    res.json({ books, books: randomRows });
  } catch (error) {
    console.error('Error fetching books from books table:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/book', async (req, res) => {
  const searchTerm = req.body.searchTerm;

  try {
    // MySQL 연결 풀에서 연결 가져오기
    const connection = await pool.getConnection();

    // 책 검색 쿼리 실행
    const [result] = await connection.query(
      'SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR publisher LIKE ? OR price = ? OR image_url LIKE ? OR description LIKE ?',
      [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        searchTerm,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ]
    );

    // 연결 반환
    connection.release();

    // books.ejs 렌더링
    res.json(result);
  } catch (error) {
    console.error('Error searching books in books table:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Express 서버에서 책 정보를 클라이언트에게 전송하는 부분
app.get('/books', async (req, res) => {
  try {
    // MySQL 연결 풀에서 연결 가져오기
    const connection = await pool.getConnection();

    // 모든 책 정보를 조회하는 쿼리 실행
    const [books] = await connection.query('SELECT * FROM books');

    // 연결 반환
    connection.release();

    // 클라이언트에게 JSON 형식으로 책 정보 전송
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST 요청 처리
app.post('/books', async (req, res) => {
  const books = req.body;

  // 받은 책 정보를 HTML로 변환
  const booksHTML = books.map((book) => generateBookHTML(book)).join('');

  // 클라이언트에 응답
  res.send(booksHTML);
});

app.get('/test', (req, res) => {
  res.render('test');
});

// 알라딘 API 키
const ALADIN_API_KEY = 'ttbjogeon.721017001';

const coverUrl = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx';

async function searchAladdinApi(apiKey, query) {
  const params = {
    ttbkey: apiKey,
    QueryType: 'Keyword',
    Query: query,
    output: 'js',
    Version: '20131101',
  };

  try {
    const response = await axios.get(coverUrl, { params });
    const items = response.data.item || [];
    return items;
  } catch (error) {
    console.error('Error searching Aladdin API:', error.message);
    return [];
  }
}

async function searchBooksAndInsertToDatabase(query) {
  try {
    const books = await searchAladdinApi(ALADIN_API_KEY, query);
    if (books.length > 0) {
      const booksWithImageUrls = await getBooksWithImageUrls(books);
      // 각 책의 정보를 MySQL 데이터베이스에 삽입
      for (const book of booksWithImageUrls) {
        await insertBookToDatabase(book);
        await insertBookImageToDatabase(book); // 이미지 URL을 책 이미지 테이블에 삽입
      }
      // 각 책의 정보와 이미지 URL을 함께 출력
      booksWithImageUrls.forEach((book) => {
        console.log('Title:', book.title);
        console.log('Author:', book.author);
        console.log('Publisher:', book.publisher);
        console.log('Price:', book.price);
        console.log('Image URL:', book.image_url);
        console.log('Description:', book.description);
        console.log('----------------------------------');
      });
    } else {
      console.log('No books found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function insertBookToDatabase(book) {
  const { title, author, publisher, price, image_url, description } = book;
  console.log('Book to insert:', book);

  const query = `
        INSERT INTO books (title, author, publisher, price, image_url, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  const values = [title, author, publisher, price, image_url, description];

  try {
    const connection = await pool.getConnection();
    await connection.query(query, values);
    connection.release();

    console.log(`Book "${title}" inserted into database.`);
    return true; // 성공적으로 책을 데이터베이스에 삽입했음을 나타냄
  } catch (error) {
    console.error(
      `Error inserting book "${title}" into database:`,
      error.message
    );
    return false; // 책을 데이터베이스에 삽입하는 동안 에러가 발생했음을 나타냄
  }
}

async function insertBookImageToDatabase(book) {
  const { title, image_url, description } = book;
  const query = `
        INSERT INTO book_image (title, image_url, description)
        VALUES (?, ?, ?)
    `;
  const values = [title, image_url, description];

  try {
    const connection = await pool.getConnection();
    await connection.query(query, values);
    connection.release();

    console.log(`Image for book "${title}" inserted into database.`);
    return true;
  } catch (error) {
    console.error(
      `Error inserting image for book "${title}" into database:`,
      error.message
    );
    return false;
  }
}

async function fetchCoverImageUrl(link) {
  try {
    const response = await axios.get(link);
    if (response.status === 200) {
      const html = response.data;
      const regexImage = /<meta property="og:image" content="(.*?)"/;
      const regexDescription =
        /<meta property="og:description" content="(.*?)"/;
      const matchImage = regexImage.exec(html);
      const matchDescription = regexDescription.exec(html);

      if (matchImage && matchImage[1]) {
        console.log(`Image URL fetched: ${matchImage[1]}`);
        const imageUrl = matchImage[1];
        const description =
          matchDescription && matchDescription[1] ? matchDescription[1] : 'N/A';
        return { imageUrl, description };
      } else {
        console.log('No image URL found on the page.');
        return { imageUrl: 'N/A', description: 'N/A' };
      }
    } else {
      console.log(`Failed to fetch image URL. Status Code: ${response.status}`);
      return { imageUrl: 'N/A', description: 'N/A' };
    }
  } catch (error) {
    console.error('Error fetching image URL:', error.message);
    return { imageUrl: 'N/A', description: 'N/A' };
  }
}

async function getBooksWithImageUrls(books) {
  const booksWithImageUrls = [];
  for (const book of books) {
    try {
      const imageUrl = await fetchCoverImageUrl(book.link);
      const bookWithImageUrl = { ...book, image_url: imageUrl };
      console.log('Book with Image URL:', bookWithImageUrl);
      booksWithImageUrls.push(bookWithImageUrl);
    } catch (error) {
      console.error(
        `Error fetching image URL for book "${book.title}":`,
        error.message
      );
      // 이미지 URL을 가져오는 동안 에러가 발생하면 해당 책은 이미지 URL 없이 추가됩니다.
      booksWithImageUrls.push(book);
    }
  }
  return booksWithImageUrls;
}

async function searchBooksAndInsertToDatabase(query) {
  try {
    const books = await searchAladdinApi(ALADIN_API_KEY, query);
    if (books.length > 0) {
      const booksWithImageUrls = await getBooksWithImageUrls(books);
      // POST 요청을 통해 클라이언트에게 책 정보 전송
      axios
        .post(
          'https://www.aladin.co.kr/ttb/api/ItemSearch.aspx/books',
          booksWithImageUrls
        )
        .then((response) => {
          console.log('Books sent to client successfully.');
        })
        .catch((error) => {
          console.error('Error sending books to client:', error.message);
        });
    } else {
      console.log('No books found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

searchBooksAndInsertToDatabase('미래')
  .then(() => {
    console.log('Search and insertion completed successfully.');
    // 여기에 다음 동작 추가
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

app.listen(port, () => {
  console.log(`서버가 실행되었습니다. 접속주소 :http://localhost:${port}`);
});
