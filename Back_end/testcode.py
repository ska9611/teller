import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import mysql.connector

# 알라딘 API 키
ALADIN_API_KEY = 'ttbjogeon.721017001'

# MongoDB 연결 정보
MONGODB_URI = 'mongodb://192.168.100.133:27017'
DATABASE_NAME = 'mongodb-test'
COLLECTION_NAME = 'books'

# MySQL 연결 정보
MYSQL_HOST = 'localhost'
MYSQL_USER = 'keon'
MYSQL_PASSWORD = 'wjwlajsxM1!'
MYSQL_DATABASE = 'users'

def fetch_cover_image_url(link):
    response = requests.get(link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        cover_image_tag = soup.find('meta', {'property': 'og:image'})
        if cover_image_tag:
            image_url = cover_image_tag.get('content', '')
            print(f"Image URL fetched: {image_url}")  # 디버깅 메시지 추가
            return image_url
        else:
            print("No image URL found on the page.")
    else:
        print(f"Failed to fetch image URL. Status Code: {response.status_code}")
    return 'N/A'


def search_aladdin_api(api_key, query):
    base_url = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx'

    params = {
        'ttbkey': api_key,
        'QueryType': 'Keyword',
        'Query': query,
        'output': 'js',
        'Version': '20131101'
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        items = data.get('item', [])

        for item in items:
            # Fetch additional information like ISBN and image URL
            isbn = item.get('isbn', 'N/A')

            # Extract image URL from web scraping
            image_url = fetch_cover_image_url(item.get('link', ''))
            print(f"Image URL: {image_url}")  # Add this line for debugging

            # Add ISBN and image URL to the item dictionary
            item['isbn'] = isbn
            item['image_url'] = image_url


        return items
    else:
        print(f"Error: {response.status_code}")
        return []

def save_image_url_to_mongodb(isbn, image_url):
    client = MongoClient(MONGODB_URI)
    db = client[DATABASE_NAME]
    image_url_collection = db['image_urls']

    # Check if ISBN already exists
    existing_entry = image_url_collection.find_one({'isbn': isbn})

    if existing_entry:
        print(f"ISBN '{isbn}' already exists in image_urls collection. Skipping insertion.")
    else:
        # Insert ISBN and image URL to image_urls collection
        result = image_url_collection.insert_one({
            'isbn': isbn,
            'image_url': image_url
        })


        if result.inserted_id:
            print(f"Image URL for ISBN '{isbn}' successfully inserted into image_urls collection.")
        else:
            print(f"Failed to insert image URL for ISBN '{isbn}' into image_urls collection.")

    client.close()

def get_image_url_from_mongodb(isbn):
    client = MongoClient(MONGODB_URI)
    db = client[DATABASE_NAME]
    image_url_collection = db['image_urls']

    entry = image_url_collection.find_one({'isbn': isbn})
    
    client.close()

    if entry:
        return entry['image_url']
    else:
        return 'N/A'


def create_index_for_image_urls():
    client = MongoClient(MONGODB_URI)
    db = client[DATABASE_NAME]
    image_url_collection = db['image_urls']

    # title 필드에 고유한 인덱스 설정
    image_url_collection.create_index("isbn", unique=True)

    client.close()

def insert_books_to_mongodb(books, collection):
    inserted_ids = []  # 삽입된 도서들의 ID를 저장할 리스트

    for book in books:
        isbn = book.get('isbn')
        image_url = book.get('image_url')

        # 이미지 URL이 존재하면 저장
        if image_url != 'N/A':
            save_image_url_to_mongodb(isbn, image_url)

        # 중복 확인을 위해 title을 기준으로 검색
        existing_book = collection.find_one({'title': book.get('title')})

        if existing_book:
            print(f"Book '{book['title']}' already exists. Skipping insertion.")
        else:
             # 원하는 도서 정보를 MongoDB에 삽입
            result = collection.insert_one(book)

            if result.inserted_id:
                inserted_ids.append(result.inserted_id)  # 삽입된 도서의 ID를 리스트에 추가
                print(f"Book '{book['title']}' successfully inserted into the books collection.")
            else:
                print(f"Failed to insert book '{book['title']}' into the collection.")

    return inserted_ids  # 삽입된 도서들의 ID를 반환

def insert_books_to_mysql(books):
    connection = None
    inserted_ids = []  # 삽입된 도서들의 ID를 저장할 리스트
    try:
        # MySQL에 연결
        connection = mysql.connector.connect(
            host='ubuntu-virtual-machine',
            user='keon',
            password='wjwlajsxM1!',
            database='users'
        )

        if connection.is_connected():
            cursor = connection.cursor()
            

            for book in books:
                print(f"Processing book: {book}")
                isbn = str(book.get('isbn'))  # Assuming isbn should be a string
                image_url = book.get('image_url', '')

                # 이미지 URL이 존재하면 저장
                if image_url != 'N/A':
                    # Assuming you have a function to save image URL to MongoDB, call it here
                    # save_image_url_to_mongodb(isbn, image_url)

                # 중복 확인을 위해 title을 기준으로 검색
                    query = "SELECT * FROM booksing WHERE title = %s"
                    title_value = (book.get('title',''),)
                    cursor.execute(query, title_value)
                    existing_book = cursor.fetchone()

                if existing_book:
                    print(f"Book '{book['title']}' already exists. Skipping insertion.")
                else:
                    # 원하는 도서 정보를 MySQL에 삽입
                    query = """
                        INSERT INTO booksing (title, link, author, pubDate, description, isbn, isbn13, itemId, priceSales,
                        priceStandard, mallType, stockStatus, mileage, cover, categoryId, categoryName, publisher, salesPoint,
                        adult, fixedPrice, customerReviewRank, image_url)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """
                    values = (
                        book.get('title', ''),
                        book.get('link', ''),
                        book.get('author', ''),
                        book.get('pubDate', ''),
                        book.get('description', ''),
                        isbn,
                        book.get('isbn13', ''),
                        book.get('itemId', ''),
                        book.get('priceSales', ''),
                        book.get('priceStandard', ''),
                        book.get('mallType', ''),
                        book.get('stockStatus', ''),
                        book.get('mileage', ''),
                        book.get('cover', ''),
                        book.get('categoryId', ''),
                        book.get('categoryName', ''),
                        book.get('publisher', ''),
                        book.get('salesPoint', ''),
                        book.get('adult', ''),
                        book.get('fixedPrice', ''),
                        book.get('customerReviewRank', ''),
                        book.get('image_url', '')
                    )
                    try:
                        cursor.execute(query, values)
                        connection.commit()
                        inserted_ids.append(cursor.lastrowid)  # 삽입된 도서의 ID를 리스트에 추가
                        print(f"Book '{book['title']}' successfully inserted into the booksing table.")
                    except mysql.connector.Error as err:
                        print(f"MySQL Error: {err}")
                        print(f"Failed to connect to MySQL. Host: {err.host}, Error Code: {err.errno}, Message: {err.msg}")

    except mysql.connector.Error as err:
        print(f"MySQL Error: {err}")

    finally:
        # 연결 종료
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
    return inserted_ids

def create_index(collection):
    # title field에 고유한 인덱스 설정
    collection.create_index("title", unique=True)

if __name__ == "__main__":
    query = '재훈'

    result = search_aladdin_api(ALADIN_API_KEY, query)

    if result:
        client = MongoClient(MONGODB_URI)
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_NAME]

        create_index(collection)

        # insert_books_to_mysql 함수에서 삽입된 도서들의 ID를 받아옴
        inserted_ids_mysql = insert_books_to_mysql(result)

        # insert_books_to_mongodb 함수에서 삽입된 도서들의 ID를 받아옴
        inserted_ids = insert_books_to_mongodb(result, collection)

        # 여러 도서가 삽입된 경우, 해당 ID들을 사용하여 추가 작업 가능
        for inserted_id in inserted_ids:
            print(f"Inserted Book ID: {inserted_id}")

        client.close()