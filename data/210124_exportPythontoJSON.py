import pickle
import json
from datetime import datetime
import random 

def read_pickle_file(file_path):
    with open(file_path, 'rb') as file:
        return pickle.load(file)

def write_pickle_file(data, file_path):
    with open(file_path, 'wb') as file:
        pickle.dump(data, file)

def write_json_file(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def add_new_elements(data):
    # Modify data as per the requirements discussed
    # Example: Adding dummy element
    # Add the detailed data to the existing structure under South African Birds
    # Add the new data to the existing structure
    data["gameFile"]["spoofGameFolders"]["South African Birds"] = south_african_birds_folders
    data["gameFile"]["spoofCorrectTag"].update(south_african_birds_correct_tag)
    data["gameFile"]["spoofIncorrectTag"].update(south_african_birds_incorrect_tag)
    data["gameFile"]["spoofInstructions"].update(south_african_birds_instructions)
    data["gameFile"]["spoofMacroGameSets"].update(south_african_birds_macro_game_sets)
    return data

##########################################################################################


# New data for South African Birds
south_african_birds_folders = {
        "DOVE01": [
          "African green-pigeon",
          "Laughing dove",
          "Namaqua dove",
          "Rameron pigeon"
        ],
        "DOVE02": [
          "Red-eyed dove",
          "Rock pigeon",
          "Speckled pigeon",
          "Tambourine dove"
        ],
        "DUCK01": [
          "African black duck",
          "African pygmy-goose",
          "Blue-billed teal",
          "Cape teal"
        ],
        "DUCK02": [
          "Egyptian goose",
          "Knob-billed duck",
          "Maccoa duck",
          "South african shelduck"
        ],
        "Ducks, geese and waterfowl_ALL": [
          "African black duck",
          "African pygmy-goose",
          "Blue-billed teal",
          "Cape teal",
          "Egyptian goose",
          "Knob-billed duck",
          "Maccoa duck",
          "South african shelduck"
        ],
        "GEESE01": [
          "Cape francolin",
          "Chukar",
          "Crested francolin",
          "Harlequin quail"
        ],
        "GEESE02": [
          "Indian peafowl",
          "Natal francolin",
          "Red-necked francolin",
          "Cape francolin"
        ],
        "PLOVER01": [
          "American golden-plover",
          "Black-bellied plover",
          "Blacksmith lapwing",
          "Black-winged lapwing"
        ],
        "PLOVER02": [
          "Caspian plover",
          "Crowned lapwing",
          "Lesser sand-plover",
          "Long-toed lapwing"
        ],
        "PLOVER03": [
          "Pacific golden-plover",
          "Senegal lapwing",
          "Wattled lapwing",
          "White-headed lapwing"
        ],
        "Pheasants, grouse and allies_ALL": [
          "Cape francolin",
          "Chukar",
          "Crested francolin",
          "Harlequin quail",
          "Indian peafowl",
          "Natal francolin",
          "Red-necked francolin",
          "Cape francolin"
        ],
        "Pigeons and doves_ALL": [
          "African green-pigeon",
          "Laughing dove",
          "Namaqua dove",
          "Rameron pigeon",
          "Red-eyed dove",
          "Rock pigeon",
          "Speckled pigeon",
          "Tambourine dove"
        ],
        "Plovers and lapwings_ALL": [
          "American golden-plover",
          "Black-bellied plover",
          "Blacksmith lapwing",
          "Black-winged lapwing",
          "Caspian plover",
          "Crowned lapwing",
          "Lesser sand-plover",
          "Long-toed lapwing",
          "Pacific golden-plover",
          "Senegal lapwing",
          "Wattled lapwing",
          "White-headed lapwing"
        ],
        "South African Birds_ALL": [
          "American golden-plover",
          "Black-bellied plover",
          "Blacksmith lapwing",
          "Black-winged lapwing",
          "Caspian plover",
          "Crowned lapwing",
          "Lesser sand-plover",
          "Long-toed lapwing",
          "Pacific golden-plover",
          "Senegal lapwing",
          "Wattled lapwing",
          "White-headed lapwing",
          "African green-pigeon",
          "Laughing dove",
          "Namaqua dove",
          "Rameron pigeon",
          "Red-eyed dove",
          "Rock pigeon",
          "Speckled pigeon",
          "Tambourine dove",
          "Cape francolin",
          "Chukar",
          "Crested francolin",
          "Harlequin quail",
          "Indian peafowl",
          "Natal francolin",
          "Red-necked francolin",
          "Cape francolin",
          "African black duck",
          "African pygmy-goose",
          "Blue-billed teal",
          "Cape teal",
          "Egyptian goose",
          "Knob-billed duck",
          "Maccoa duck",
          "South african shelduck"
        ]
    },

def generate_tags(folders):
    correct_tag = {}
    incorrect_tag = {}

# Iterate over each subcategory
    print(folders, folders[0])
    for subcategory, birds in folders.items():
        # Generate correct tag
        correct_tag[subcategory] = [None] + birds + [""]

        # Generate incorrect tag
        incorrect_options = []
        for other_subcategory, other_birds in folders.items():
            if other_subcategory != subcategory:
                incorrect_options.extend(other_birds)
        random.shuffle(incorrect_options)

        incorrect_tag[subcategory] = [None]
        for bird in birds:
            options = [bird] + random.sample(incorrect_options, min(3, len(incorrect_options)))
            random.shuffle(options)
            incorrect_tag[subcategory].append(options)

    return correct_tag, incorrect_tag

south_african_birds_correct_tag, south_african_birds_incorrect_tag = generate_tags(south_african_birds_folders)
south_african_birds_instructions = {
      "PLOVER01": [
        None,
        "Find the American golden-plover.",
        "Locate the Black-bellied plover.",
        "Identify the Blacksmith lapwing.",
        "Can you find the Black-winged lapwing?",
        "Game complete!"
      ],
      "PLOVER02": [
        None,
        "Find the Caspian plover.",
        "Locate the Crowned lapwing.",
        "Identify the Lesser sand-plover.",
        "Can you find the Long-toed lapwing?",
        "Game complete!"
      ],
      "PLOVER03": [
        None,
        "Find the Pacific golden-plover.",
        "Locate the Senegal lapwing.",
        "Identify the Wattled lapwing.",
        "Can you find the White-headed lapwing?",
        "Game complete!"
      ],
      "DOVE01": [
        None,
        "Find the African green-pigeon.",
        "Locate the Laughing dove.",
        "Identify the Namaqua dove.",
        "Can you find the Rameron pigeon?",
        "Game complete!"
      ],
      "DOVE02": [
        None,
        "Find the Red-eyed dove.",
        "Locate the Rock pigeon.",
        "Identify the Speckled pigeon.",
        "Can you find the Tambourine dove?",
        "Game complete!"
      ],
      "DUCK01": [
        None,
        "Find the African black duck.",
        "Locate the African pygmy-goose.",
        "Identify the Blue-billed teal.",
        "Can you find the Cape teal?",
        "Game complete!"
      ],
      "DUCK02": [
        None,
        "Find the Egyptian goose.",
        "Locate the Knob-billed duck.",
        "Identify the Maccoa duck.",
        "Can you find the South african shelduck?",
        "Game complete!"
      ],
}
south_african_birds_macro_game_sets = {
    "South African Birds": {
        "Ducks, geese and waterfowl": [
          None,
          [
            "DUCK01",
            "Home",
            "South African Birds",
            1
          ],
          [
            "DUCK02",
            "Home",
            "South African Birds",
            1
          ]
        ],
        "Pheasants, grouse and allies": [
          None,
          [
            "GEESE01",
            "Home",
            "South African Birds",
            1
          ],
          [
            "GEESE02",
            "Home",
            "South African Birds",
            1
          ]
        ],
        "Pigeons and doves": [
          None,
          [
            "DOVE01",
            "Home",
            "South African Birds",
            1
          ],
          [
            "DOVE02",
            "Home",
            "South African Birds",
            1
          ]
        ],
        "Plovers and lapwings": [
          None,
          [
            "PLOVER01",
            "Home",
            "South African Birds",
            1
          ],
          [
            "PLOVER02",
            "Home",
            "South African Birds",
            1
          ],
          [
            "PLOVER03",
            "Home",
            "South African Birds",
            1
          ]
        ]
      }
    }
south_african_birds_release = {
      "South African Birds": {
        "released": 1,
        "visible": 1
      }}


##########################################################################################



# Read the existing .pkl file
pkl_file_path = 'data/saved_python_object.pkl'  # Replace with your actual file path
data = read_pickle_file(pkl_file_path)

# Modify the data by adding new elements
data = add_new_elements(data)

# Generate file names based on the current date and time
current_timestamp = datetime.now().strftime('%d%m%Y_%H%M')
new_pkl_file_path = f'database_in_python_updated_{current_timestamp}.pkl'
new_json_file_path = f'database_in_python_updated_{current_timestamp}.json'

# Write the updated data to new .pkl and .json files
write_pickle_file(data, new_pkl_file_path)
write_json_file(data, new_json_file_path)




# south_african_birds_correct_tag = {
#       "PLOVER01": [
#         None,
#         "American golden-plover",
#         "Black-bellied plover",
#         "Blacksmith lapwing",
#         "Black-winged lapwing",
#         ""
#       ],
#       "PLOVER02": [
#         None,
#         "Caspian plover",
#         "Crowned lapwing",
#         "Lesser sand-plover",
#         "Long-toed lapwing",
#         ""
#       ],
#       "PLOVER03": [
#         None,
#         "Pacific golden-plover",
#         "Senegal lapwing",
#         "Wattled lapwing",
#         "White-headed lapwing",
#         ""
#       ],
#       "DOVE01": [
#         None,
#         "African green-pigeon",
#         "Laughing dove",
#         "Namaqua dove",
#         "Rameron pigeon",
#         ""
#       ],
#       "DOVE02": [
#         None,
#         "Red-eyed dove",
#         "Rock pigeon",
#         "Speckled pigeon",
#         "Tambourine dove",
#         ""
#       ],
#       "DUCK01": [
#         None,
#         "African black duck",
#         "African pygmy-goose",
#         "Blue-billed teal",
#         "Cape teal",
#         ""
#       ],
#       "DUCK02": [
#         None,
#         "Egyptian goose",
#         "Knob-billed duck",
#         "Maccoa duck",
#         "South african shelduck",
#         ""
#       ],
#       "GEESE01": [
#         None,
#         "Cape francolin",
#         "Chukar",
#         "Crested francolin",
#         "Harlequin quail"
#     ],
#       "GEESE02": [
#         None,
#         "Indian peafowl",
#         "Natal francolin",
#         "Red-necked francolin",
#         "Cape francolin" ]
# }
# south_african_birds_incorrect_tag = {
#       "DOVE01": [
#         None,
#         [
#           "Laughing dove",
#           "Namaqua dove",
#           "Rameron pigeon"
#         ],
#         [
#           "African green-pigeon",
#           "Namaqua dove",
#           "Rameron pigeon"
#         ],
#         [
#           "African green-pigeon",
#           "Laughing dove",
#           "Rameron pigeon"
#         ],
#         [
#           "African green-pigeon",
#           "Laughing dove",
#           "Namaqua dove"
#         ],
#         [
#           ""
#         ]
#       ],
#       "DOVE02": [
#         None,
#         [
#           "Rock pigeon",
#           "Speckled pigeon",
#           "Tambourine dove"
#         ],
#         [
#           "Red-eyed dove",
#           "Speckled pigeon",
#           "Tambourine dove"
#         ],
#         [
#           "Red-eyed dove",
#           "Rock pigeon",
#           "Tambourine dove"
#         ],
#         [
#           "Red-eyed dove",
#           "Rock pigeon",
#           "Speckled pigeon"
#         ],
#         [
#           ""
#         ]
#       ],
#       "DUCK01": [
#         None,
#         [
#           "African pygmy-goose",
#           "Blue-billed teal",
#           "Cape teal"
#         ],
#         [
#           "African black duck",
#           "Blue-billed teal",
#           "Cape teal"
#         ],
#         [
#           "African black duck",
#           "African pygmy-goose",
#           "Cape teal"
#         ],
#         [
#           "African black duck",
#           "African pygmy-goose",
#           "Blue-billed teal"
#         ],
#         [
#           ""
#         ]
#       ],
#       "DUCK02": [
#         None,
#         [
#           "Knob-billed duck",
#           "Maccoa duck",
#           "South african shelduck"
#         ],
#         [
#           "Egyptian goose",
#           "Maccoa duck",
#           "South african shelduck"
#         ],
#         [
#           "Egyptian goose",
#           "Knob-billed duck",
#           "South african shelduck"
#         ],
#         [
#           "Egyptian goose",
#           "Knob-billed duck",
#           "Maccoa duck"
#         ],
#         [
#           ""
#         ]
#       ],
#       "GEESE01": [
#         None,
#         [
#           "Chukar",
#           "Crested francolin",
#           "Harlequin quail"
#         ],
#         [
#           "Cape francolin",
#           "Crested francolin",
#           "Harlequin quail"
#         ],
#         [
#           "Cape francolin",
#           "Chukar",
#           "Harlequin quail"
#         ],
#         [
#           "Cape francolin",
#           "Chukar",
#           "Crested francolin"
#         ],
#         [
#           ""
#         ]
#       ],
#       "GEESE02": [
#         None,
#         [
#           "Natal francolin",
#           "Red-necked francolin",
#           "Cape francolin"
#         ],
#         [
#           "Indian peafowl",
#           "Red-necked francolin",
#           "Cape francolin"
#         ],
#         [
#           "Indian peafowl",
#           "Natal francolin",
#           "Cape francolin"
#         ],
#         [
#           "Indian peafowl",
#           "Natal francolin",
#           "Red-necked francolin"
#         ],
#         [
#           ""
#         ]
#       ],
#       "PLOVER01": [
#         None,
#         [
#           "Black-bellied plover",
#           "Blacksmith lapwing",
#           "Black-winged lapwing",
#           ""
#         ],
#         [
#           "American golden-plover",
#           "Blacksmith lapwing",
#           "Black-winged lapwing",
#           ""
#         ],
#         [
#           "American golden-plover",
#           "Black-bellied plover",
#           "Black-winged lapwing",
#           ""
#         ],
#         [
#           "American golden-plover",
#           "Black-bellied plover",
#           "Blacksmith lapwing",
#           ""
#         ],
#         [
#           ""
#         ]
#       ],
#       "PLOVER02": [
#         None,
#         [
#           "Crowned lapwing",
#           "Lesser sand-plover",
#           "Long-toed lapwing"
#         ],
#         [
#           "Caspian plover",
#           "Lesser sand-plover",
#           "Long-toed lapwing"
#         ],
#         [
#           "Caspian plover",
#           "Crowned lapwing",
#           "Long-toed lapwing"
#         ],
#         [
#           "Caspian plover",
#           "Crowned lapwing",
#           "Lesser sand-plover"
#         ],
#         [
#           ""
#         ]
#       ],
#       "PLOVER03": [
#         None,
#         [
#           "Senegal lapwing",
#           "Wattled lapwing",
#           "White-headed lapwing"
#         ],
#         [
#           "Pacific golden-plover",
#           "Wattled lapwing",
#           "White-headed lapwing"
#         ],
#         [
#           "Pacific golden-plover",
#           "Senegal lapwing",
#           "White-headed lapwing"
#         ],
#         [
#           "Pacific golden-plover",
#           "Senegal lapwing",
#           "Wattled lapwing"
#         ],
#         [
#           ""
#         ]
#       ]
# }