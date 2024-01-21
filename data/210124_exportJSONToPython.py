import json

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Path to your JSON file
json_file_path = 'data/200124_database.json'

# Read the JSON file and convert it to a Python object
python_data = read_json_file(json_file_path)

# Now `python_data` is a Python dictionary that represents the data from the JSON file
#print(python_data)

import pickle

# Saving the Python object to a file
with open('data/saved_python_object.pkl', 'wb') as file:
    pickle.dump(python_data, file)

# Loading the Python object back
with open('data/saved_python_object.pkl', 'rb') as file:
    loaded_python_object = pickle.load(file)

print(loaded_python_object)