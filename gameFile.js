

const spoofGameSets = {
    "Africa": ["Africa_country_identification", "Africa_country_of_location"],
    "Dogs": ["Dogs", "Spaniels"],
    "Cheeses": ["Cheeses"],
    "Animal tracks": ["Footprints of species", "Animal gait from tracks"],
};

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
    "Africa_country_identification": {
        1: require("./assets/context/Africa_country_identification/africa-flag_map.jpg"),
    },
    "Africa_country_of_location": {
        1: require("./assets/context/Africa_country_identification/africa-flag_map.jpg"),
    },
    "Animal gait from tracks": {
        1: "https://firebasestorage.googleapis.com/v0/b/fir-auth-31f82.appspot.com/o/Animal%20gait%20from%20tracks%2F_instructions%2Fslide_16.jpg?alt=media&token=fc9ff496-ce60-4a1b-8196-08a137ae1aa3&_gl=1*1f96ncl*_ga*NTE5OTA5MzMxLjE2ODQ1ODUyMTA.*_ga_CW55HF8NVT*MTY4NjQ5MTM2NS41MS4xLjE2ODY0OTIxMDYuMC4wLjA.",
    }, // TBD | DATABASE CALL.
    "Footprints of species": {
        1: "https://firebasestorage.googleapis.com/v0/b/fir-auth-31f82.appspot.com/o/Footprints%20of%20species%2F_instructions%2Finstructions.jpg?alt=media&token=05d3a99e-6304-46f5-9b5e-a318d815fb14&_gl=1*eqx4hx*_ga*NTE5OTA5MzMxLjE2ODQ1ODUyMTA.*_ga_CW55HF8NVT*MTY4NjQ5MTM2NS41MS4xLjE2ODY0OTIwMjUuMC4wLjA.",
    },
};

for (let i=1; i<56; i++){
    spoofOutcomeImages["Africa_country_identification"][i] = require("./assets/context/Africa_country_identification/africa-flag_map.jpg")
    spoofOutcomeImages["Africa_country_of_location"][i] = require("./assets/context/Africa_country_identification/africa-flag_map.jpg")
};

// DONE | each storage folder is linked to an instruction + correct tag
const spoofInstructions = {
    "Dogs": {
        1: 'Level 1: Find all the Boxers.',
        2: 'Level 2: Find the Bullmastiffs',
        3: 'Level 3: Where is the English Mastiff?',
        4: 'Test: Find the bullmastiffs until there are none left.',
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
    "Africa_country_identification": {
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
        6: 'Test your knowledge: find the American water s.', //vs ['Field Spaniel', 'Boykin spaniel']
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
};

// const spoofInstructions = {
//   1: 'Level 1: Dogs: where is the Shiba Inu?',
//   2: 'Level 2: Nuts: find the walnuts',
//   3: 'Level 3: Wines: where are the Red Wine Glasses?',
//   4: 'Game complete.'
// }

const spoofCorrectTag = {
    'Dogs': {
        1: 'Boxer',
        2: 'Bullmastiff',
        3: 'Mastiff',
        4: 'Bullmastiff',
        5: ''
    },
    'Cheeses': {
        1: 'Rochebaron',
        2: 'Bleu d\'Auvergne',
        3: 'Roquefort',
        4: 'Bleu d\'Auvergne',
        5: ''
    },
    'Spaniels': {
        1: 'Boykin spaniel',
        2: 'American water spaniel',
        3: 'Field spaniel',
        4: 'American water spaniel',
        5: 'Results:'
    },
    'Africa_country_identification': {
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
};

const spoofIncorrectTag = {
    'Dogs': {
        1: ['Bullmastiff'],
        2: ['Boxer'],
        3: ['Bullmastiff'],     
        4: ['Mastiff', 'Boxer'],
        5: ['']  
    },
    'Cheeses': {
        1: ['Roquefort'],
        2: ['Rochebaron'],
        3: ['Bleu d\'Auvergne'],     
        4: ['Rochebaron', 'Roquefort'],
        5: ['']  
    },
    'Spaniels': {
        1: ['Field spaniel'],
        2: ['Boykin spaniel'],
        3: ['American water spaniel'],
        4: ['Field Spaniel', 'Boykin spaniel'],
        5: ['']
    },
    'Africa_country_identification': {
        1: ['Algeria'],
        2: ['Morocco', 'Algeria'],
        3: ['Tunisia', 'Morocco'],
        4: ['Tunisia', 'Algeria'],
        5: ['']
    },
    'Africa_country_of_location': {
        1: ['Algeria'],
        2: ['Morocco', 'Algeria'],
        3: ['Tunisia', 'Morocco'],
        4: ['Tunisia', 'Algeria'],
        5: ['']
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
}

export {spoofGameSets, spoofOutcomeImages, spoofInstructions, spoofCorrectTag, spoofIncorrectTag}