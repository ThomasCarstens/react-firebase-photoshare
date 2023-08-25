

const spoofGameSets = {
    // "Dogs":         ["Sighthounds", "Shepherd dogs", "Terriers_2", "Hounds", "Dogs", "Spaniels", "Terriers" ],
    "Dogs":         ["Hounds", "Shepherd dogs", "Spaniels", "Terriers", "Mastiffs" ],
    "Cheeses":      ["Cheeses"],
    "Africa":       ["Africa_id", "Africa_country_of_location"],
    "Animal tracks":["Footprints of species", "Animal gait from tracks"],
    "Knots":        ["One rope applications", "Choose the right knot"],
    "History":      ["Historical eras"],
    // "Life expectancy": ['Dogs', 'Sheperd dogs'],
    "Life expectancy": ['BigSmall1', 'BigSmall2', 'BigSmall3'],
    "Dog hunting situations": ['Sighthound VS Scenthounds', 'Spaniel VS Others', 'Shepherd Dog VS Others'],
    "French Bread": [ 'Loaf', 'Baguette'],
    "Helicopters":  ["Light twin engine"],
    "Sight VS Scent":  ["Hounds", "Sighthounds"],
    "Hounds_01":    ["Hounds_01"],

};

const spoofGameAllocation = {
    "Dogs": "Home", 
    "Cheeses": "Home",
    "Life expectancy": "Comparison",
    "Dog hunting situations": "Application"
};

const spoofReleaseStatus = {
    // [Visible, Released]
    "Dogs": {'visible': 1, 'released': 1},
    "French Bread": {'visible': 1, 'released': 1},
    "Vegetables": {'visible': 1, 'released': 0},
    "Footprints": {'visible': 1, 'released': 0},
};

// Game sets. Screens Ordered.
const spoofMacroGameSets = {
    // "Dogs": {
    //     // ORDER: [Name in Dict, Type of Game, Folder Name, Stage of Dict], 
    //     1: ["Sight VS Scent", "Home", "Dogs", 1],
    //     2: ["Life expectancy", "Comparison", "Dogs", 0],
    //     3: ["Dog hunting situations", "Application", "Dogs", 0],
    // },
    "Dogs": {
        "Hounds": {
            2: ["Hounds_02", "Home", "Dogs", 1],  
            1: ["Hounds_03", "Home", "Dogs", 1],    
            3: ["Hounds_01", "Home", "Dogs", 1],        
        },
        "Shepherd dogs": {
            3: ["Shepherds_01", "Home", "Dogs", 2],
            1: ["Shepherds_02", "Home", "Dogs", 4],
            2: ["Shepherds_02", "Home", "Dogs", 1],
        },    
    },
    "French Bread": {
        "Loaf": {
            1: ["Loaf_01", "Home", "French Bread", 1],
            2: ["Loaf_02", "Home", "French Bread", 1],
            3: ["Loaf_03", "Home", "French Bread", 1],
        },
        "Baguette": {
            1: ["Shepherd dogs", "Home", "Dogs", 1],
            3: ["Shepherds_01", "Home", "Dogs", 2],
            2: ["Shepherds_02", "Home", "Dogs", 4],
            4: ["Shepherd dogs", "Score", "Dogs", 1],
        },    
    },
    "Vegetables": {
        "Roots": {
        },
        "Legumes": {
        },    
    },
    "Footprints": {
        "Straddlers": {
        },
        "Waddlers": {
        },    
    },
    "Cereal": {
        "Straddlers": {
        },
        "Waddlers": {
        },    
    },
    "Cheeses": {
        "Goat": {
            1: ["Hounds", "Score", "Dogs", 1],
            2: ["Hounds_02", "Home", "Dogs", 1],        
            4: ["Hounds_01", "Home", "Dogs", 1],        
            5: ["Hounds_03", "Home", "Dogs", 1],
            6: ["Hounds", "Score", "Dogs", 1],
        },
        "Cow": {
            1: ["Shepherd dogs", "Score", "Dogs", 1],
            3: ["Shepherds_01", "Home", "Dogs", 2],
            2: ["Shepherds_02", "Home", "Dogs", 4],
            4: ["Shepherd dogs", "Score", "Dogs", 1],
        },    
    },
};

// Game Sets. Tags Ordered.
const spoofGameFolders = {
    "Vegetables": {
        "Beans":    ["Bean" ],
        "Flowers":  ["Broccoli", "Cauliflower"],
        "Roots":    ["Carrot", "Potato", "Radish"],
        "Leaf":     ["Cabbage"],
        "Fruit":    ["Capsicum", "Bitter gourd", "Bottle gourd", "Brinjal", "Cucumber"],        
    },
    "Dogs": {
        "Dogs_ALL":         ["Beauceron",      "Belgian Sheepdog",    "German Shepherd Dog", "Icelandic Sheepdog",
                            "Bearded Collie",      "Border Collie",    "Old English Sheepdog", "Australian Shepherd",
                            "Belgian Malinois",      "Bouvier des Flandres",    "Briard", "Collie",
                            'Beagle',              'Bloodhound',           'American Foxhound',        'Basset Hound',
                             'Dachshund',        'Bluetick Coonhound',   'Black and Tan Coonhound',  'Plott Hound',
                             'Afghan Hound',     'Otterhound',           'Basenji',                  'Irish Wolfhound'],


        "Sighthound VS Scenthounds":    ["Italian Greyhound",   "Beagle",     "Bloodhound",        "American Foxhound"],
        "Spaniel VS Others":            ["Boxer",   "Boykin Spaniel",     "Silky Terrier",        "Bull Terrier"],
        "Shepherd Dog VS Others":       ["Boxer",   "Boykin Spaniel",     "Border Collie",        "Bloodhound"],
        "BigSmall1":       ["Boxer",   "Bull Terrier"],
        "BigSmall2":       ["Silky Terrier",   "Bloodhound"],
        "BigSmall3":       ["Pharaoh Hound",   "Beagle"],


        "Sighthounds":         ["Italian Greyhound",   "Ibizan Hound",     "Pharaoh Hound",        "Greyhound"],
        "Shepherd dogs":       ["Bearded Collie",      "Border Collie",    "Old English Sheepdog", "Australian Shepherd"],
        "Shepherd dogs_ALL":       ["Beauceron",      "Belgian Sheepdog",    "German Shepherd Dog", "Icelandic Sheepdog",
                                    "Bearded Collie",      "Border Collie",    "Old English Sheepdog", "Australian Shepherd",
                                    "Belgian Malinois",      "Bouvier des Flandres",    "Briard", "Collie"],

        "Shepherds_01":        ["Beauceron",      "Belgian Sheepdog",    "German Shepherd Dog", "Icelandic Sheepdog"],
        "Shepherds_02":        ["Bearded Collie",      "Border Collie",    "Old English Sheepdog", "Australian Shepherd"],
        "Shepherds_03":        ["Belgian Malinois",      "Bouvier des Flandres",    "Briard", "Collie"],

        "Terriers_2":         ["Silky Terrier",       "Irish Terrier",    "Yorkshire Terrier",    "Cairn Terrier"],
        "Terriers":    ['Boston Terrier',      'American Staffordshire Terrier', 'Staffordshire Bull Terrier', 'Bull Terrier'],
        
        "Hounds":           ['Beagle',              'Bloodhound',       'American Foxhound',    'Basset Hound'],

        "Hounds_ALL":       ['Beagle',              'Bloodhound',           'American Foxhound',        'Basset Hound',
                             'Dachshund',        'Bluetick Coonhound',   'Black and Tan Coonhound',  'Plott Hound',
                             'Afghan Hound',     'Otterhound',           'Basenji',                  'Irish Wolfhound'],

        "Hounds_01":        ['Beagle',              'Bloodhound',       'American Foxhound',    'Basset Hound'],
        "Hounds_02":        ['Dachshund',    'Bluetick Coonhound',      'Black and Tan Coonhound',    'Plott Hound'],
        "Hounds_03":        ['Afghan Hound',              'Otterhound',       'Basenji',    'Irish Wolfhound'],

        "Hounds_11":        ['Beagle',              'Otterhound',      'Irish Wolfhound',  'American Foxhound'  ],
        "Hounds_12":        ['Afghan Hound',     'Bluetick Coonhound',     'Black and Tan Coonhound',      'Basenji'],
        "Hounds_13":        ['Dachshund',         'Bloodhound',       'Basset Hound' ,    'Plott Hound'   ],


        "Mastiffs":         ['Boxer',               'Bullmastiff',      'Mastiff'],
        "Dogs":             ['Boxer',               'Bullmastiff',      'Mastiff'],
        "Spaniels":         ['Field Spaniel',       'Boykin Spaniel',   'American Water Spaniel'],
        "Pointers":         ['German Shorthaired Pointer',       'German Wirehaired Pointer'],
        
    },
    "French Bread": {
        "Baguette":    ["Baguette classique",   "Ficelle",     "Flute",        "Fournee", "Viennoise"],
        "Loaf": ["Brioche", "Fougasse", "Pain de campagne", "Pain d'epices", 
                "Pogne de Romans", "Pompe a l'huile","Fouee", "Gibassier",
                "Pain au son", "Boule au pain", "Pain au chocolat", "Croissant"],
        "Loaf_01": ["Brioche", "Fougasse", "Pain de campagne", "Pain d'epices" ],
        "Loaf_02": ["Pogne de Romans", "Pompe a l'huile", "Fouee", "Gibassier" ],
        "Loaf_03": ["Pain au son", "Boule au pain", "Pain au chocolat", "Croissant"],
        "Loaf_11": ["Pompe a l'huile", "Fougasse", "Pain au chocolat", "Pain d'epices" ],
        "Loaf_12": ["Pain au son", "Brioche", "Fouee", "Gibassier" ],
        "Loaf_13": ["Pogne de Romans", "Boule au pain", "Pain de campagne",  "Croissant"],
    },
    "Helicopters": {
        "Light twin engine":    ["AS355", "H135", "H145"],
        "Intermediate single engine": [],
        "Medium twin engine": ["H155", "H160" ],
        "Heavy twin engine": ["H215", "H225"]
    },
    "Africa": {
        "North Coast":      ["Tunisia",   "Morocco",     "Algeria",        "Libya"],
    },    
};


const spoofGameMetrics = {
    "Vegetables": {
        "Growing cycle": {
            "Bean": 0, "Broccoli": 0 , "Cauliflower":0 ,
            "Carrot":0, "Potato":0, "Radish":0,
            "Cabbage":0,
            "Capsicum":0, "Bitter gourd":0, "Bottle gourd":0, "Brinjal":0, "Cucumber":0
        },
    },
    "Dogs": {
        "Dog hunting situations": {
                "Italian Greyhound":"Sighthounds",   "Ibizan Hound":"Sighthounds",     "Pharaoh Hound":"Sighthounds",        "Greyhound":"Sighthounds",
                "Bearded Collie":"Shepherd Dogs",      "Border Collie":"Shepherd Dogs",    "Old English Sheepdog":"Shepherd Dogs", "Australian Shepherd":"Shepherd Dogs",
                "Silky Terrier":"Terriers",       "Irish Terrier":"Terriers",    "Yorkshire Terrier":"Terriers",    "Cairn Terrier":"Terriers",
                'Boston Terrier':"Bull Terriers",      'American Staffordshire Terrier':"Bull Terriers", 'Staffordshire Bull Terrier':"Bull Terriers", 'Bull Terrier':"Bull Terriers",
                'Beagle':"Scenthounds",              'Bloodhound':"Scenthounds",       'American Foxhound':"Scenthounds",    'Basset Hound':"Scenthounds",
                'Boxer':"Mastiffs",               'Bullmastiff':"Mastiffs",      'Mastiff':"Mastiffs",
                'Field Spaniel':"Spaniels",       'Boykin Spaniel':"Spaniels",   'American Water Spaniel':"Spaniels",
            },

            // https://rvc-repository.worktribe.com/output/1558210
        "Life expectancy": {
            'Italian Greyhound': 10.02, 'Ibizan Hound': 0, 'Pharaoh Hound': 11.83, 
            'Greyhound': 9.36, 'Bearded Collie': 12.77, 'Border Collie': 12.52, 
            'Old English Sheepdog': 11.19, 'Australian Shepherd': 12.28, 'Silky Terrier': 14.25, 'Irish Terrier': 0, 'Yorkshire Terrier': 12.6, 'Cairn Terrier': 13.84, 'Boston Terrier': 10.92, 'American Staffordshire Terrier': 0, 'Staffordshire Bull Terrier': 12.05, 'Bull Terrier': 10.21, 'Beagle': 12.3, 'Bloodhound': 6.75, 'American Foxhound': 0, 'Basset Hound': 11.43, 'Boxer': 8.81, 'Bullmastiff': 7.57, 'Mastiff': 6.5, 'Field Spaniel': 9.9, 'Boykin Spaniel': 0, 'American Water Spaniel': 0
        },

        "Annual food cost": {
            'Italian Greyhound': 324.0, 'Ibizan Hound': 0, 'Pharaoh Hound': 466.0, 'Greyhound': 324.0, 'Bearded Collie': 0, 'Border Collie': 324.0, 'Old English Sheepdog': 710.0, 'Australian Shepherd': 466.0, 'Silky Terrier': 0, 'Irish Terrier': 0, 'Yorkshire Terrier': 324.0, 'Cairn Terrier': 324.0, 'Boston Terrier': 324.0, 'American Staffordshire Terrier': 0, 'Staffordshire Bull Terrier': 466.0, 'Bull Terrier': 466.0, 'Beagle': 324.0, 'Bloodhound': 710.0, 'American Foxhound': 0, 'Basset Hound': 324.0, 'Boxer': 466.0, 'Bullmastiff': 466.0, 'Mastiff': 701.0, 'Field Spaniel': 0, 'Boykin Spaniel': 0, 'American Water Spaniel': 0
        },
    },    
};

// for (let i=1; i<56; i++){
//     spoofGameMetrics["Life expectancy"][i] = require("./assets/context/Africa_country_identification/africa-flag_map.jpg")
// };


const spoofUnits = {
    "Life expectancy": "years",
    "Growing cycle": "months",
    "Population (2022)": "million",
};

const spoofGameHashtags = {
    "Dogs": "Dogs - Spaniel - Boxer - Mastiff - Beagle - Terriers",
    "Cheeses": "Cheeses",
    "Africa": "Africa_id - Africa_country_of_location",
    "Animal tracks": "Footprints of species - Animal gait from tracks",
    "Knots": "One rope - Two ropes",
};

// DEPRECATED | DATABASE CALL.
var spoofOutcomeImages = {
    "Dogs": {
        1: require("./assets/context/Dogs/all3.png"),
        2: require("./assets/context/Dogs/boxer_bullmastiff.png"),
        3: require("./assets/context/Dogs/mastiff_bullmastiff_table.png"),
    },
    "Cheeses": {
        1: require("./assets/context/Cheeses/_instructions/1.png"),
        2: require("./assets/context/Cheeses/_instructions/2.png"),
        3: require("./assets/context/Cheeses/_instructions/3.png"),        
        4: require("./assets/context/Cheeses/_instructions/4.png"),
    },
    "Africa": {
        1: require("./assets/context/Africa_country_identification/africa-flag_map.jpg"),
    },
    "Africa_id": {
        1: require("./assets/context/Africa_country_identification/africa-flag_map.jpg"),
    },
    "Africa_country_of_location": {
        1: require("./assets/context/Africa_country_identification/africa-flag_map.jpg"),
    },
    "Animal gait from tracks": {
        1: "https://firebasestorage.googleapis.com/v0/b/fir-auth-31f82.appspot.com/o/Animal%20gait%20from%20tracks%2F_instructions%2Fslide_16.jpg?alt=media&token=fc9ff496-ce60-4a1b-8196-08a137ae1aa3&_gl=1*1f96ncl*_ga*NTE5OTA5MzMxLjE2ODQ1ODUyMTA.*_ga_CW55HF8NVT*MTY4NjQ5MTM2NS41MS4xLjE2ODY0OTIxMDYuMC4wLjA.",
    }, 
    "Footprints of species": {
        1: "https://firebasestorage.googleapis.com/v0/b/fir-auth-31f82.appspot.com/o/Footprints%20of%20species%2F_instructions%2Finstructions.jpg?alt=media&token=05d3a99e-6304-46f5-9b5e-a318d815fb14&_gl=1*eqx4hx*_ga*NTE5OTA5MzMxLjE2ODQ1ODUyMTA.*_ga_CW55HF8NVT*MTY4NjQ5MTM2NS41MS4xLjE2ODY0OTIwMjUuMC4wLjA.",
    },

};

// for (let i=1; i<56; i++){
//     spoofOutcomeImages["Africa_country_identification"][i] = require("./assets/context/Africa_country_identification/africa-flag_map.jpg")
//     spoofOutcomeImages["Africa_country_of_location"][i] = require("./assets/context/Africa_country_identification/africa-flag_map.jpg")
// };

// DONE | each storage folder is linked to an instruction + correct tag
const spoofInstructions = {
    "DogTest": {
        1: 'Level 1: Find all the Australian Shepherds.',
        2: 'We now look at the American Water Spaniel.',
        3: 'Where is the Border Collie?',
        4: 'Congratulations! You completed all the levels.',
        },
    "Dog hunting situations": {
        1: 'Environment 1.',
        2: 'Environment 2.',
        3: '',
        },
    "Life expectancy": {
        1: 'Order by life expectancy.',
        2: 'Order by life expectancy (2).',
        3: 'Order by life expectancy (3)',
        4: 'Congratulations! You completed all the levels.',
        },
    "Dogs": {
        1: 'Level 1: Find all the Boxers.',
        2: 'Level 2: Find the Bullmastiffs',
        3: 'Level 3: Where is the English Mastiff?',
        4: 'Nice work, ready for the next level?',
        // 5: 'Game complete: '+ (100*successRate).toFixed(0)+ ' % success rate.'
    },
    "Cheeses": {
        1: 'First, let\'s find the Rochebaron.',//vs.Roquefort(3)
        2: 'We now look at the Bleu d\'Auvergne.', // vs. Rochebaron(3)
        3: 'Can you tell which is the Roquefort?',//vs. Bleu d'Auvergne.
        4: 'Test your knowledge: find the Bleu d\'Auvergne.', //vs ['Rochebaron', 'Roquefort']
        // 5: 'Game complete: '+ (100*successRate).toFixed(0)+ ' % success rate.'
        },    
    "Spaniels": {
        1: 'First, let\'s find the Boykin Spaniel.',//vs.Field Spaniel(3)
        2: 'We now look at the American Water Spaniel.', // vs. Boykin(3)
        3: 'Can you tell which is the Field Spaniel?',//vs. Welsh Springer.
        4: 'Test your knowledge: find the American water s.', //vs ['Field Spaniel', 'Boykin spaniel']
        // 5: 'Game complete: '+ (100*successRate).toFixed(0)+ ' % success rate.'
        },    
    "Africa_id": {
        1: 'First, let\'s identify Morocco.',//vs. Algeria
        2: 'Then Tunisia.', // vs. Boykin(3)
        3: 'Now Algeria',//vs. Welsh Springer.
        4: 'Now Libya',//vs. Welsh Springer.
        5: 'Finally: Algeria',//vs. Welsh Springer.
        6: 'Game complete!', //vs ['Field Spaniel', 'Boykin spaniel']
        // 5: 'Game complete: '+ (100*successRate).toFixed(0)+ ' % success rate.'
        },    
    "Africa_country_of_location": {
        1: 'First, let\'s identify Morocco.',//vs. Algeria
        2: 'Then Tunisia.', // vs. Boykin(3)
        3: 'Now Algeria',//vs. Welsh Springer.
        4: 'Now Libya',//vs. Welsh Springer.
        5: 'Finally: Algeria',//vs. Welsh Springer.
        6: 'Game complete!', //vs ['Field Spaniel', 'Boykin spaniel']
        // 5: 'Game complete: '+ (100*successRate).toFixed(0)+ ' % success rate.'
        },    
    "Animal gait from tracks": {
        1: 'First, let\'s identify waddlers.',//vs. Algeria
        2: 'Then leapers and hoppers.', // vs. Boykin(3)
        3: 'Now for zig zaggers.',//vs. Welsh Springer.
        4: 'That was the easier stage. Are you ready for the next level?', //vs ['Field Spaniel', 'Boykin spaniel']
        // 5: 'Game complete: '+ (100*successRate).toFixed(0)+ ' % success rate.'
        },    
    "Footprints of species": {
        1: 'First, let\'s look for bear tracks.',//vs. Dog
        2: 'Can you identify the lion tracks?', // vs. Dog
        3: 'Now for finding the Dog tracks.',//vs. Bear and Lion
        4: 'Are you ready for the next level?', //vs ['Field Spaniel', 'Boykin spaniel']
        // 5: 'Game complete: '+ (100*successRate).toFixed(0)+ ' % success rate.'
        },    
    "Hounds": {
        1: 'First, let\'s find the Basset Hounds.',
        2: 'We now look at the Beagles.',
        3: 'Can you tell which is the Bloodhound?',
        4: 'Test your knowledge: find the American Foxhound.',
        5: 'Done with the Hounds. '
        },
    "Hounds_01": {
        1: 'Find the Beagle.',
        2: 'Locate the Bloodhound.',
        3: 'Identify the American Foxhound.',
        4: 'Can you find the Basset Hound?',
        5: 'Game complete!'
    },
    "Hounds_02": {
        1: 'Find the Dachshund.',
        2: 'Locate the Bluetick Coonhound.',
        3: 'Identify the Black and Tan Coonhound.',
        4: 'Can you find the Plott Hound?',
        5: 'Game complete!'
    },
    "Hounds_03": {
        1: 'Find the Afghan Hound.',
        2: 'Locate the Otterhound.',
        3: 'Identify the Basenji.',
        4: 'Can you find the Irish Wolfhound?',
        5: 'Game complete!'
    },
    "Sighthounds": {
        1: 'Level 1: Find all the Greyhounds.',
        2: 'Level 2: Find the Italian Greyhounds.',
        3: 'Level 3: Where is the Ibizan Hound?',
        4: 'Nice work! Can you locate the Pharaoh Hound?',
        5: 'Congratulations! You completed all the levels.',
        },
    "Terriers": {
        1: 'First, let\'s find the Bull Terriers.',
        2: 'We now look at the Boston Terriers.',
        3: 'Can you tell which is the American Staffordshire Terrier?',
        4: 'Test your knowledge: find the Staffordshire Bull Terrier.',
        5: 'Nice work! Ready for the next level?',
        },
    "Terriers_2": {
        1: 'Level 1: Find all the Cairn Terriers.',
        2: 'Level 2: Find the Silky Terriers.',
        3: 'Level 3: Where is the Irish Terrier?',
        4: 'Nice work! Can you locate the Yorkshire Terrier?',
        5: 'Congratulations! You completed all the levels.',
        },
    "Shepherd dogs": {
        1: 'Level 1: Find all the Australian Shepherds.',
        2: 'Level 2: Find the Bearded Collies.',
        3: 'Level 3: Where is the Border Collie?',
        4: 'Nice work! Can you locate the Old English Sheepdog?',
        5: 'Congratulations! You completed all the levels.',
        },
    "Shepherds_01": {
        1: 'Find the Beauceron.',
        2: 'Locate the Belgian Sheepdog.',
        3: 'Identify the German Shepherd Dog.',
        4: 'Can you find the Icelandic Sheepdog?',
        5: 'Game complete!'
    },
    "Shepherds_02": {
        1: 'Find the Bearded Collie.',
        2: 'Locate the Border Collie.',
        3: 'Identify the Old English Sheepdog.',
        4: 'Can you find the Australian Shepherd?',
        5: 'Game complete!'
    },
    "Shepherds_03": {
        1: 'Find the Belgian Malinois.',
        2: 'Locate the Bouvier des Flandres.',
        3: 'Identify the Briard.',
        4: 'Can you find the Collie?',
        5: 'Game complete!'
    },
    "One rope": {
        1: "Level 1: Find the Overhand Knot.",
        2: "Level 2: Locate the Slip Knot.",
        3: "Level 3: Identify the Figure-8 Loop.",
        4: "Level 4: Can you find the Figure-8 Knot?",
        5: "Game complete!"
    },
    "One rope applications": {
        1: "Find the Overhand Knot.",
        2: "Locate the Slip Knot.",
        3: "Identify the Figure-8 Loop.",
        4: "Can you find the Figure-8 Knot?",
        5: "Can you find the Bowline Knot?",
        6: "Game complete!"        
    },
    "Choose the right knot": {
        1: "Ribbon for a present.",
        2: "A head bandage out of a cloth.",
        3: "Tying flintwood together.",
        4: "Anchoring around a tree trunk.",
        5: "Between fishing line and fishing hook.",
        6: "Game complete!"        
    },
    "Historical eras": {
        1: "Order inventions from most ancient to most recent.",
        2: "Game complete!"
    },
    "Sighthound VS Scenthounds": {
        1: 'Wide open fields. A deer in the distance. ',
        2: ''
        },
    'Spaniel VS Others': {
        1: 'Moles are damaging the vineyard.',
        2: ''   
    },
    'Shepherd Dog VS Others': {
        1: 'The sheep have broken through the fence and they are dispersing.',
        2: ''   
    },
    "Baguette": {
        1: "Find the Baguette classique.",
        2: "Locate the Ficelle.",
        3: "Identify the Flute.",
        4: "Can you find the Fournee?",
        5: "Can you find the Viennoise?",
        6: "Now, locate the Baguette classique.",
        7: "Try to find the Ficelle.",
        8: "Great! Now, identify the Viennoise.",
        9: "Game complete!",
    },
    "Loaf": {
        1: "Find the Brioche.",
        2: "Locate the Fougasse.",
        3: "Identify the Pain de campagne.",
        4: "Can you find the Pain d'epices?",
        5: "Can you find the Pogne de Romans?",
        6: "Can you find the Pompe a l'huile?",
        7: "Game complete!"
    },
    "Light twin engine": {
        1: "Find the AS355.",
        2: "Locate the H135.",
        3: "Identify the H145.",
        4: "Can you find the AS355?",
        5: "Can you find the H135?",
        6: "Game complete!"
    },
};


const spoofCorrectTag = {

    "DogTest": {
        1: "Australian Shepherd",
        2: 'American Water Spaniel',
        3: "Border Collie",
        4: 'Congratulations! You completed all the levels.',
        },
    'Dogs': {
        1: 'Boxer',
        2: 'Bullmastiff',
        3: 'Mastiff',
        4: 'Bullmastiff',
        5: ''
    },
    "Sighthound VS Scenthounds": {
        1: 'Italian Greyhound',
        2: ''
        },
    'Spaniel VS Others': {
        1: 'Boykin Spaniel',
        2: ''   
    },
    'Shepherd Dog VS Others': {
        1: 'Border Collie',
        2: ''   
    },
    'Cheeses': {
        1: 'Rochebaron',
        2: 'Bleu d\'Auvergne',
        3: 'Roquefort',
        4: 'Bleu d\'Auvergne',
        5: ''
    },
    'Spaniels': {
        1: 'Boykin Spaniel',
        2: 'American Water Spaniel',
        3: 'Field Spaniel',
        4: 'American Water Spaniel',
        5: 'Results:'
    },
    'Africa_id': {
        1: 'Morocco',
        2: 'Tunisia',
        3: 'Algeria',
        4: 'Libya',
        5: 'Algeria',
        6: ''
    },    
    'Africa_country_of_location': {
        1: 'Morocco',
        2: 'Tunisia',
        3: 'Algeria',
        4: 'Libya',
        5: 'Algeria',
        6: ''
    },  
    "Animal gait from tracks": {
        1: 'Waddlers',
        2: 'LeapersHoppers', 
        3: 'Zigzaggers',
        4: '', 
        },    
    "Footprints of species": {
        1: 'Bear',//vs. Dog
        2: 'Lion', // vs. Dog
        3: 'Dog',//vs. Bear and Lion
        4: '', 
        },     
    'Hounds': {
        1: 'Basset Hound',
        2: 'Beagle',
        3: 'Bloodhound',
        4: 'American Foxhound',
        5: ''
        },
    "Sighthounds": {
        1: "Greyhound",
        2: "Italian Greyhound",
        3: "Ibizan Hound",
        4: "Pharaoh Hound",
        5: "",
        },
    'Terriers': {
        1: 'Bull Terrier',
        2: 'Boston Terrier',
        3: 'American Staffordshire Terrier',
        4: 'Staffordshire Bull Terrier',
        5: ''
        },
    "Terriers_2": {
        1: "Cairn Terrier",
        2: "Silky Terrier",
        3: "Irish Terrier",
        4: "Yorkshire Terrier",
        5: "",
        },
    "Shepherd dogs": {
        1: "Australian Shepherd",
        2: "Bearded Collie",
        3: "Border Collie",
        4: "Old English Sheepdog",
        5: "",
        },
    "One rope": {        
        1: "Overhand Knot",
        2: "Slip Knot",
        3: "Figure-8 Loop",
        4: "Figure-8 Knot",
        5: ""
        },
    "Historical eras": {
        1: ["19th", "20th", "21st"],
        2: [""]
    },
    "Life expectancy":{
        1:       ["Boxer",   "Bull Terrier"],
        2:       ["Silky Terrier",   "Bloodhound"],
        3:       ["Pharaoh Hound",   "Beagle"],
        4:      [""]
    },
    "One rope applications": {
        1: "Overhand Knot",
        2: "Slip Knot",
        3: "Figure-8 Loop",
        4: "Figure-8 Knot",
        5: "Bowline Knot",
        6: "",
      },
      "Choose the right knot": {
        1: "Reef Knot",
        2: "Reef Knot",
        3: "Reef Knot",
        4: "Bowline Knot",
        5: "Figure-8 Loop",
        6: "",
    },
      "Baguette": {
        1: "Baguette classique",
        2: "Ficelle",
        3: "Flute",
        4: "Fournee",
        5: "Viennoise",
        6: "Baguette classique",
        7: "Ficelle",
        8: "Viennoise",
        9: "",
    },
    "Loaf": {
        1: "Brioche",
        2: "Fougasse",
        3: "Pain de campagne",
        4: "Pain d'epices",
        5: "Pogne de Romans",
        6: "Pompe a l'huile",
        7: ""
    },
    "Light twin engine": {
        1: "AS355",
        2: "H135",
        3: "H145",
        4: "AS355",
        5: "H135",
        6: ""
    },
    "Hounds_01": {
        1: 'Beagle',
        2: 'Bloodhound',
        3: 'American Foxhound',
        4: 'Basset Hound',
        5: ''
    },
    "Hounds_02": {
        1: 'Dachshund',
        2: 'Bluetick Coonhound',
        3: 'Black and Tan Coonhound',
        4: 'Plott Hound',
        5: ''
    },
    "Hounds_03": {
        1: 'Afghan Hound',
        2: 'Otterhound',
        3: 'Basenji',
        4: 'Irish Wolfhound',
        5: ''
    },
    "Shepherds_01": {
        1: 'Beauceron',
        2: 'Belgian Sheepdog',
        3: 'German Shepherd Dog',
        4: 'Icelandic Sheepdog',
        5: ''
    },
    "Shepherds_02": {
        1: 'Bearded Collie',
        2: 'Border Collie',
        3: 'Old English Sheepdog',
        4: 'Australian Shepherd',
        5: ''
    },
    "Shepherds_03": {
        1: 'Belgian Malinois',
        2: 'Bouvier des Flandres',
        3: 'Briard',
        4: 'Collie',
        5: ''
    },
};

const spoofIncorrectTag = {
    "DogTest": {
        1: ["Bearded Collie", "Border Collie", "Old English Sheepdog"],
        2: ['Boykin Spaniel'],
        3: ["Australian Shepherd", "Bearded Collie", "Old English Sheepdog"],
        4: 'Congratulations! You completed all the levels.',
        },
    'Dogs': {
        1: ['Bullmastiff'],
        2: ['Boxer'],
        3: ['Bullmastiff'],     
        4: ['Mastiff', 'Boxer'],
        5: ['']  
    },
    'Sighthound VS Scenthounds': {
        1: ['Beagle', 'Bloodhound', 'American Foxhound'],
        2: ['']   
        // 3: ["Boxer", "Boykin spaniel",  "Bloodhound"],
        // 4: ['']
    },
    'Spaniel VS Others': {
        1: ["Boxer","Silky Terrier",   "Bull Terrier"],
        2: ['']   
    },  
    'Shepherd Dog VS Others': {
        1: ["Boxer",   "Boykin Spaniel",     "Bloodhound"],
        2: ['']   
    },      
    'Cheeses': {
        1: ['Roquefort'],
        2: ['Rochebaron'],
        3: ['Bleu d\'Auvergne'],     
        4: ['Rochebaron', 'Roquefort'],
        5: ['']  
    },
    'Spaniels': {
        1: ['Field Spaniel'],
        2: ['Boykin Spaniel'],
        3: ['American Water Spaniel'],
        4: ['Field Spaniel', 'Boykin Spaniel'],
        5: ['']
    },
    'Africa_id': {
        1: ['Algeria'],
        2: ['Morocco', 'Algeria'],
        3: ['Tunisia', 'Morocco'],
        4: ['Tunisia', 'Algeria'],
        5: ['Tunisia', 'Morocco'],
        6: ['']
    },
    'Africa_country_of_location': {
        1: ['Algeria'],
        2: ['Morocco', 'Algeria'],
        3: ['Tunisia', 'Morocco'],
        4: ['Tunisia', 'Algeria'],
        5: ['Tunisia', 'Morocco'],
        6: ['']
    },
    "Animal gait from tracks": {
        1: ['LeapersHoppers'],
        2: ['Zigzaggers'], 
        3: ['Waddlers', 'LeapersHoppers'],
        4: [''], 
        },    
    "Footprints of species": {
        1: ['Dog'],//vs. Dog
        2: ['Dog'], // vs. Dog
        3: ['Bear', 'Lion'],//vs. Bear and Lion
        4: '', 
        },     
    'Hounds': {
        1: ['Beagle', 'Bloodhound', 'American Foxhound'],
        2: ['Basset Hound', 'Bloodhound', 'American Foxhound'],
        3: ['Basset Hound', 'Beagle', 'American Foxhound'],
        4: ['Basset Hound', 'Beagle', 'Bloodhound'],
        5: ['']
        },
    "Sighthounds": {
        1: ["Italian Greyhound", "Ibizan Hound", "Pharaoh Hound"],
        2: ["Greyhound", "Ibizan Hound", "Pharaoh Hound"],
        3: ["Greyhound", "Italian Greyhound", "Pharaoh Hound"],
        4: ["Greyhound", "Italian Greyhound", "Ibizan Hound"],
        5: [""],
        },
    'Terriers': {
        1: ['Boston Terrier', 'American Staffordshire Terrier', 'Staffordshire Bull Terrier'],
        2: ['Bull Terrier', 'American Staffordshire Terrier', 'Staffordshire Bull Terrier'],
        3: ['Bull Terrier', 'Boston Terrier', 'Staffordshire Bull Terrier'],
        4: ['Bull Terrier', 'Boston Terrier', 'American Staffordshire Terrier'],
        5: ['']
        },
    "Terriers_2": {
        1: ["Silky Terrier", "Irish Terrier", "Yorkshire Terrier"],
        2: ["Cairn Terrier", "Irish Terrier", "Yorkshire Terrier"],
        3: ["Cairn Terrier", "Silky Terrier", "Yorkshire Terrier"],
        4: ["Cairn Terrier", "Silky Terrier", "Irish Terrier"],
        5: [""],
        },
    "Shepherd dogs": {
        1: ["Bearded Collie", "Border Collie", "Old English Sheepdog"],
        2: ["Australian Shepherd", "Border Collie", "Old English Sheepdog"],
        3: ["Australian Shepherd", "Bearded Collie", "Old English Sheepdog"],
        4: ["Australian Shepherd", "Bearded Collie", "Border Collie"],
        5: [""],
        },
    "Life expectancy": {
        1: [''],
        2: [''],
        3: [''],
        },
    "One rope": {
        1: ["Slip Knot", "Figure-8 Loop", "Figure-8 Knot"],
        2: ["Overhand Knot", "Figure-8 Loop", "Figure-8 Knot"],
        3: ["Overhand Knot", "Slip Knot", "Figure-8 Knot"],
        4: ["Overhand Knot", "Slip Knot", "Figure-8 Loop"],
        5: [""]
        },
    "One rope applications": {
        1: ["Slip Knot", "Bowline Knot",  "Figure-8 Loop", "Figure-8 Knot",],
        2: ["Overhand Knot", "Figure-8 Loop", "Figure-8 Knot", "Bowline Knot"],
        3: ["Overhand Knot", "Slip Knot", "Figure-8 Knot", "Bowline Knot"],
        4: ["Overhand Knot", "Slip Knot", "Figure-8 Loop", "Bowline Knot"],
        5: ["Overhand Knot", "Slip Knot", "Figure-8 Loop", "Figure-8 Knot"],
        6: [""],
    },
    "Choose the right knot": {
        1: ["Bowline Knot", "Figure-8 Loop"],
        2: ["Bowline Knot", "Figure-8 Loop"],
        3: ["Bowline Knot", "Figure-8 Loop"],
        4: ["Reef Knot", "Figure-8 Loop"],
        5: ["Reef Knot", "Bowline Knot"],
        6: []
        },
    "Baguette": {
        1: ["Ficelle", "Flute"],
        2: ["Baguette classique", "Flute"],
        3: ["Baguette classique", "Fournee"],
        4: ["Ficelle", "Fournee"],
        5: ["Baguette classique", "Viennoise"],
        6: ["Ficelle", "Viennoise"],
        7: ["Baguette classique", "Flute"],
        8: ["Ficelle", "Fournee"],
        9: ["Baguette classique", "Viennoise"],
        10: []
    },
    "Loaf": {
        1: ["Fougasse", "Pain de campagne"],
        2: ["Pogne de Romans", "Pain de campagne"],
        3: ["Brioche", "Pogne de Romans"],
        4: ["Pain de campagne", "Pogne de Romans"],
        5: ["Brioche", "Pain d'epices"],
        6: ["Pain de campagne", "Pain d'epices"],
        7: ["Fougasse", "Pompe a l'huile"]
    },
    "Light twin engine": {
        1: ["H135", "H145"],
        2: ["AS355", "H145"],
        3: ["AS355", "H135"],
        4: ["H135", "H145"],
        5: ["AS355", "H135"],
        6: ["AS355", "H135"]
    },
    "Hounds_01": {
        1: ['Bloodhound', 'American Foxhound'],
        2: ['Basset Hound', 'Beagle'],
        3: ['Beagle', 'Basset Hound'],
        4: ['American Foxhound', 'Bloodhound'],
        5: ['']
    },
    "Hounds_02": {
        1: ['Bluetick Coonhound', 'Black and Tan Coonhound'],
        2: ['Plott Hound', 'Dachshund'],
        3: ['Dachshund', 'Plott Hound'],
        4: ['Black and Tan Coonhound', 'Bluetick Coonhound'],
        5: ['']
    },
    "Hounds_03": {
        1: ['Otterhound', 'Basenji'],
        2: ['Irish Wolfhound', 'Afghan Hound'],
        3: ['Afghan Hound', 'Irish Wolfhound'],
        4: ['Basenji', 'Otterhound'],
        5: ['']
    },
    "Shepherds_01": {
        1: ['Belgian Sheepdog', 'German Shepherd Dog'],
        2: ['Beauceron', 'Icelandic Sheepdog'],
        3: ['Icelandic Sheepdog', 'Beauceron'],
        4: ['German Shepherd Dog', 'Belgian Sheepdog'],
        5: ['']
    },
    "Shepherds_02": {
        1: ['Border Collie', 'Old English Sheepdog'],
        2: ['Australian Shepherd', 'Bearded Collie'],
        3: ['Bearded Collie', 'Australian Shepherd'],
        4: ['Old English Sheepdog', 'Border Collie'],
        5: ['']
    },
    "Shepherds_03": {
        1: ['Bouvier des Flandres', 'Briard'],
        2: ['Collie', 'Belgian Malinois'],
        3: ['Belgian Malinois', 'Collie'],
        4: ['Briard', 'Bouvier des Flandres'],
        5: ['']
    },
}

export {spoofReleaseStatus, spoofGameAllocation, spoofGameSets, spoofMacroGameSets, spoofGameMetrics, spoofUnits, spoofGameFolders, spoofGameHashtags, spoofOutcomeImages, spoofInstructions, spoofCorrectTag, spoofIncorrectTag}