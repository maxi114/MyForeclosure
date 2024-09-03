from dotenv import load_dotenv
load_dotenv(dotenv_path=".env.local")
import openai
import os
import json
import pymongo

# Load the review data
data = json.load(open("flashcards.json"))

# Access the MongoDB password from the environment variable
mongo_pwd = os.getenv("MongoPwd")


#setup mongodb URl
mongo_uri = f"mongodb+srv://pro:{mongo_pwd}@mycluster.pbbtvdv.mongodb.net/MyForeclosure?retryWrites=true&w=majority"


#list to store processed embeddings
processed_data = []
#call open ai while passing the APi key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Create embeddings for each section in the asset recovery data
for section in data["asset_recovery"]["sections"]:
    # Combine the title, subtitle, and descriptions into a single text input
    input_text = section['title'] + " " + section['subtitle'] + " " + " ".join([step['description'] for step in section['steps']])
    
    # Create the embedding using the input text
    response = openai.embeddings.create(
        input=input_text,
        model="text-embedding-ada-002"  # Replace with the correct model name if needed
    )
    
    # Extract the embedding from the response
    embedding = response.data[0].embedding
    
     # Append the processed data to the list
    processed_data.append(
        {
            "values": embedding,
            "id": section["title"],
            "metadata": {
                "subtitle": section["subtitle"],
                "steps": [{"step": step["step"], "description": step["description"]} for step in section["steps"]]
            }
        }
    )
    


#function to initialize mongodb
def get_mongo_client(mongo_uri):
  """Establish connection to the MongoDB."""
  try:
    client = pymongo.MongoClient(mongo_uri)
    print("Connection to MongoDB successful")
    return client
  except pymongo.errors.ConnectionFailure as e:
    print(f"Connection failed: {e}")
    return None

#call the mongo db function to connect to the database
mongo_client = get_mongo_client(mongo_uri)

# select the MyForeclosure databse
db = mongo_client['MyForeclosure']
#select the education collection
collection = db['Education'] 

# Convert the processed data into a dictionary format suitable for MongoDB
documents = processed_data  # processed_data is already in a dictionary format

# Insert the data into the MongoDB collection
collection.insert_many(documents)

    
print("Embedings created and store in the mongodb client")