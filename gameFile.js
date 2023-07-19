

const spoofGameSets = {
    "Dogs":         ["Sighthounds", "Shepherd dogs", "Terriers_2", "Hounds", "Dogs", "Spaniels", "Terriers" ],
    "Cheeses":      ["Cheeses"],
    "Africa":       ["Africa_id", "Africa_country_of_location"],
    "Animal tracks":["Footprints of species", "Animal gait from tracks"],
    "Knots":        ["One rope applications", "Choose the right knot"],
    "History":      ["Historical eras"],
    // "Life expectancy": ['Dogs', 'Sheperd dogs'],
    "Life expectancy": ['BigSmall1', 'BigSmall2', 'BigSmall3', ''],
    "Dog hunting situations": ['Sighthound VS Scenthounds', 'Spaniel VS Others', 'Shepherd Dog VS Others']
};

const spoofGameFolders = {
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
        "BigSmall1":       ["Boxer",   "Boykin Spaniel"],
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


const spoofGameMetrics = {
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

    // https://rvc-repository.worktribe.com/output/1558210
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

    // "Life expectancy": {
    //     1: ['Boxer', 'Bullmastiff', 'Mastiff'],
    //     2: ['Beagle', 'Bloodhound', 'American Foxhound', "Cairn Terrier"],
    //     3: ['Yorkshire Terrier',    "Cairn Terrier", 'Boston Terrier'],
    //     4: ['American Staffordshire Terrier', 'Staffordshire Bull Terrier', 'Bloodhound']
    //     },
    "Life expectancy":{
        1:       ["Boxer",   "Boykin Spaniel"],
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
}

export {spoofGameSets, spoofGameMetrics, spoofUnits, spoofGameFolders, spoofGameHashtags, spoofOutcomeImages, spoofInstructions, spoofCorrectTag, spoofIncorrectTag}