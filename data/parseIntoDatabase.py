import pandas as pd
import numpy as np
spoofGameFolders = {
    "Vegetables": {
        "Beans":    ["Bean" ],
        "Flowers":  ["Broccoli", "Cauliflower"],
        "Roots":    ["Carrot", "Potato", "Radish"],
        "Leaf":     ["Cabbage"],
        "Fruit":    ["Capsicum", "Bitter gourd", "Bottle gourd", "Brinjal", "Cucumber"],        
    },


    "Dogs": {
        "Sighthound VS Scenthounds":    ["Italian Greyhound",   "Beagle",     "Bloodhound",        "American Foxhound"],
        "Spaniel VS Others":            ["Boxer",   "Boykin Spaniel",     "Silky Terrier",        "Bull Terrier"],
        "Shepherd Dog VS Others":       ["Boxer",   "Boykin Spaniel",     "Border Collie",        "Bloodhound"],
        "BigSmall1":       ["Boxer",   "Boston Terrier"],
        "BigSmall2":       ["Silky Terrier",   "Bloodhound"],
        "BigSmall3":       ["Pharaoh Hound",   "Beagle"],


        "Sighthounds":                  ["Italian Greyhound",   "Ibizan Hound",     "Pharaoh Hound",        "Greyhound"],
        "Shepherd dogs":                ["Bearded Collie",      "Border Collie",    "Old English Sheepdog", "Australian Shepherd"],
        "Terriers_2":         ["Silky Terrier",       "Irish Terrier",    "Yorkshire Terrier",    "Cairn Terrier"],
        "Terriers":    ['Boston Terrier',      'American Staffordshire Terrier', 'Staffordshire Bull Terrier', 'Bull Terrier'],
        "Hounds":           ['Beagle',              'Bloodhound',       'American Foxhound',    'Basset Hound'],
        "Mastiffs":         ['Boxer',               'Bullmastiff',      'Mastiff'],
        "Dogs":             ['Boxer',               'Bullmastiff',      'Mastiff'],
        "Spaniels":         ['Field Spaniel',       'Boykin Spaniel',   'American Water Spaniel'],
    },
    "Africa": {
        "North Coast":      ["Tunisia",   "Morocco",     "Algeria",        "Libya"],
    },    
};


spoofGameMetrics = {
    "Growing cycle": {
        "Bean": 0, "Broccoli": 0 , "Cauliflower":0 ,
        "Carrot":0, "Potato":0, "Radish":0,
        "Cabbage":0,
        "Capsicum":0, "Bitter gourd":0, "Bottle gourd":0, "Brinjal":0, "Cucumber":0
    },
    "Dog hunting situations": {
        "Italian Greyhound":"Sighthounds",   "Ibizan Hound":"Sighthounds",     "Pharaoh Hound":"Sighthounds",        "Greyhound":"Sighthounds",
        "Bearded Collie":"Shepherd Dogs",      "Border Collie":"Shepherd Dogs",    "Old English Sheepdog":"Shepherd Dogs", "Australian Shepherd":"Shepherd Dogs",
        "Silky Terrier":"Terriers",       "Irish Terrier":"Terriers",    "Yorkshire Terrier":"Terriers",    "Cairn Terrier":"Terriers",
        'Boston Terrier':"Bull Terriers",      'American Staffordshire Terrier':"Bull Terriers", 'Staffordshire Bull Terrier':"Bull Terriers", 'Bull Terrier':"Bull Terriers",
        'Beagle':"Scenthounds",              'Bloodhound':"Scenthounds",       'American Foxhound':"Scenthounds",    'Basset Hound':"Scenthounds",
        'Boxer':"Mastiffs",               'Bullmastiff':"Mastiffs",      'Mastiff':"Mastiffs",
        'Field Spaniel':"Spaniels",       'Boykin Spaniel':"Spaniels",   'American Water Spaniel':"Spaniels",
    },

    "Life expectancy": {
        "Italian Greyhound":1,   "Ibizan Hound":2,     "Pharaoh Hound":3,        "Greyhound":4,
        "Bearded Collie":4,      "Border Collie":3,    "Old English Sheepdog":2, "Australian Shepherd":1,
        "Silky Terrier":2,       "Irish Terrier":3,    "Yorkshire Terrier":4.33,    "Cairn Terrier":5.44,
        'Boston Terrier':4,      'American Staffordshire Terrier':5, 'Staffordshire Bull Terrier':5, 'Bull Terrier':5,
        'Beagle':5,              'Bloodhound':5.1,       'American Foxhound':5.3,    'Basset Hound':5,
        'Boxer':4.1,               'Bullmastiff':5.2,      'Mastiff':1.1,
        'Field Spaniel':5,       'Boykin Spaniel':5,   'American Water Spaniel':5.5,
    },
    "Population (2022)": {
        "Tunisia":5,   "Morocco":5,     "Algeria":5,        "Libya":5,
    },    
    
}

df = pd.read_csv('dog_stats.csv')

# The idea is to get every species.

dogList = ["Sighthounds","Shepherd dogs","Terriers_2","Terriers", "Hounds", "Mastiffs","Dogs","Spaniels"]
# print(df.to_string()) 
for species in dogList:

    dogsInGame = spoofGameFolders["Dogs"][species]

    for dog in dogsInGame:
        dog_info = df[df['Dog breed'] == dog]
        metric = dog_info['4b food costs per year, US$'].to_string()
        # metric = dog_info['2 LONGEVITY'].to_numpy()
        try:
            # For cost
            metricFloat = (metric.split(sep='$'))[1]
            # For longevity 
            # metricFloat = float(metric)

            spoofGameMetrics["Life expectancy"][dog] = float(metricFloat)

        except IndexError:#IndexError: #ValueError
            print("!!! ", dog,metric ) 
            spoofGameMetrics["Life expectancy"][dog] = 0



print(spoofGameMetrics["Life expectancy"])

# Manual additions required.
            # LIFE EXPECTANCY
{'Italian Greyhound': 10.02, 'Ibizan Hound': 0, 'Pharaoh Hound': 11.83, 
'Greyhound': 9.36, 'Bearded Collie': 12.77, 'Border Collie': 12.52, 'Old English Sheepdog': 11.19, 'Australian Shepherd': 12.28, 'Silky Terrier': 14.25, 'Irish Terrier': 0, 'Yorkshire Terrier': 12.6, 'Cairn Terrier': 13.84, 'Boston Terrier': 10.92, 'American Staffordshire Terrier': 0, 'Staffordshire Bull Terrier': 12.05, 'Bull Terrier': 10.21, 'Beagle': 12.3, 'Bloodhound': 6.75, 'American Foxhound': 0, 'Basset Hound': 11.43, 'Boxer': 8.81, 'Bullmastiff': 7.57, 'Mastiff': 6.5, 'Field Spaniel': 9.9, 'Boykin Spaniel': 0, 'American Water Spaniel': 0}

            # !!!  Ibizan Hound ['no data']
            # !!!  Irish Terrier ['no data']
            # !!!  American Staffordshire Terrier ['no data']
            # !!!  American Foxhound ['no data']
            # !!!  Boykin Spaniel ['no data']
            # !!!  American Water Spaniel ['no data']

            # FOOD COST
{'Italian Greyhound': 324.0, 'Ibizan Hound': 0, 'Pharaoh Hound': 466.0, 'Greyhound': 324.0, 'Bearded Collie': 0, 'Border Collie': 324.0, 'Old English Sheepdog': 710.0, 'Australian Shepherd': 466.0, 'Silky Terrier': 0, 'Irish Terrier': 0, 'Yorkshire Terrier': 324.0, 'Cairn Terrier': 324.0, 'Boston Terrier': 324.0, 'American Staffordshire Terrier': 0, 'Staffordshire Bull Terrier': 466.0, 'Bull Terrier': 466.0, 'Beagle': 324.0, 'Bloodhound': 710.0, 'American Foxhound': 0, 'Basset Hound': 324.0, 'Boxer': 466.0, 'Bullmastiff': 466.0, 'Mastiff': 701.0, 'Field Spaniel': 0, 'Boykin Spaniel': 0, 'American Water Spaniel': 0}


            # !!!  Ibizan Hound 123    NaN
            # !!!  Bearded Collie 95    NaN
            # !!!  Silky Terrier 159    NaN
            # !!!  Irish Terrier 126    NaN
            # !!e!  American Staffordshire Terrier 92    NaN
            # !!!  American Foxhound 91    NaN
            # !!!  Field Spaniel 113    NaN
            # !!!  Boykin Spaniel 102    NaN
            # !!!  American Water Spaniel 93    NaN


        
        
            
