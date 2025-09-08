// Comprehensive categories and subcategories data with questions
export const categoriesData = {
  "Cleaning Services": {
    id: 1,
    name: "Cleaning Services",
    icon: "cleaning-icon",
    subcategories: {
      "General Cleaning": {
        id: "1.1",
        name: "General Cleaning",
        questions: [
          "What areas need to be cleaned? (e.g., kitchen, bathroom, living room)",
          "What is the size of the property (m²)?",
          "How many rooms need cleaning?",
          "Do you need one-time or regular cleaning?",
          "Do you provide cleaning products or should the cleaner bring them?",
          "When would you like the cleaning to be done?"
        ]
      },
      "Deep Cleaning": {
        id: "1.2",
        name: "Deep Cleaning",
        questions: [
          "What areas require deep cleaning?",
          "Is there any specific concern (e.g., mold, grease, allergens)?",
          "What is the approximate size of the space (m²)?",
          "How long has it been since the last deep clean?",
          "Do you need any special equipment or products?",
          "When would you like the deep cleaning to be done?"
        ]
      },
      "Office Cleaning": {
        id: "1.3",
        name: "Office Cleaning",
        questions: [
          "What type of office space needs cleaning?",
          "How many employees work in the office?",
          "What is the size of the office (m²)?",
          "Do you need daily, weekly, or monthly cleaning?",
          "Are there any special requirements (e.g., after-hours cleaning)?",
          "Do you provide cleaning supplies or should we bring them?"
        ]
      },
      "Window Cleaning": {
        id: "1.4",
        name: "Window Cleaning",
        questions: [
          "How many windows need cleaning?",
          "What type of windows (e.g., ground floor, high-rise)?",
          "Do you need interior, exterior, or both?",
          "Are there any hard-to-reach windows?",
          "How often do you need window cleaning?",
          "When would you like the service?"
        ]
      }
    }
  },
  "Technical & Construction": {
    id: 2,
    name: "Technical & Construction",
    icon: "construction-icon",
    subcategories: {
      "Electrician": {
        id: "2.1",
        name: "Electrician",
        questions: [
          "What type of electrical work is required?",
          "Is it a new installation or repair?",
          "How many switches, lights, or sockets are involved?",
          "Do you provide materials or should the professional bring them?",
          "When do you need the work done?",
          "Is there an existing electrical panel or do you need one installed?"
        ]
      },
      "Plumber": {
        id: "2.2",
        name: "Plumber",
        questions: [
          "What plumbing task is required?",
          "Where is the problem located?",
          "Is it an emergency service?",
          "Do you already have the parts?",
          "When do you need the service?",
          "Is there water damage or flooding?"
        ]
      },
      "Carpenter": {
        id: "2.3",
        name: "Carpenter",
        questions: [
          "What type of carpentry work is needed?",
          "What materials do you prefer (wood type, finish)?",
          "Do you have measurements or need them taken?",
          "Is this a repair, installation, or custom build?",
          "When do you need the work completed?",
          "Do you provide materials or need sourcing?"
        ]
      },
      "Painter": {
        id: "2.4",
        name: "Painter",
        questions: [
          "What needs to be painted (interior, exterior, or both)?",
          "How many rooms or areas are involved?",
          "What type of paint finish do you prefer?",
          "Do you have the paint or need color consultation?",
          "When would you like the painting done?",
          "Are there any special preparation requirements?"
        ]
      }
    }
  },
  "Garden & Outdoor": {
    id: 3,
    name: "Garden & Outdoor",
    icon: "gardening-icon",
    subcategories: {
      "Gardener": {
        id: "3.1",
        name: "Gardener",
        questions: [
          "What type of gardening work is required?",
          "How large is the garden (m²)?",
          "Do you need regular maintenance or one-time service?",
          "Do you have specific plants or trees to care for?",
          "When would you like the work to start?",
          "Do you provide tools or should the gardener bring them?"
        ]
      },
      "Landscaper": {
        id: "3.2",
        name: "Landscaper",
        questions: [
          "Do you have a design or concept already?",
          "What is the size of the area to landscape?",
          "What features should be included? (e.g., paths, grass, pond)",
          "Do you need help with material selection?",
          "What is your budget range?",
          "When would you like the project to start?"
        ]
      },
      "Tree Services": {
        id: "3.3",
        name: "Tree Services",
        questions: [
          "What type of tree work is needed?",
          "How many trees are involved?",
          "What is the approximate height of the trees?",
          "Is there access for equipment?",
          "Do you need stump removal as well?",
          "When do you need the service?"
        ]
      }
    }
  },
  "Home & Comfort": {
    id: 4,
    name: "Home & Comfort",
    icon: "home-icon",
    subcategories: {
      "Smart Home Installation": {
        id: "4.1",
        name: "Smart Home Installation",
        questions: [
          "What type of smart home devices do you want installed? (e.g., lights, thermostat, doorbell)",
          "How many devices need installation?",
          "Do you already have the devices?",
          "What type of system should they connect to? (e.g., Alexa, Google, Apple)",
          "When should the installation take place?",
          "Do you need help with device selection?"
        ]
      },
      "Home Theater Setup": {
        id: "4.2",
        name: "Home Theater Setup",
        questions: [
          "Do you already have the equipment or need recommendations?",
          "How many speakers and devices are involved?",
          "Do you want wall mounting or in-wall wiring?",
          "What size is the room (approx. m²)?",
          "What is your budget range?",
          "When would you like the setup completed?"
        ]
      },
      "HVAC Services": {
        id: "4.3",
        name: "HVAC Services",
        questions: [
          "What type of HVAC work is needed?",
          "Is this for heating, cooling, or both?",
          "What is the size of the space (m²)?",
          "Do you need installation, repair, or maintenance?",
          "When do you need the service?",
          "Do you have existing ductwork?"
        ]
      }
    }
  },
  "Design & Planning": {
    id: 5,
    name: "Design & Planning",
    icon: "design-icon",
    subcategories: {
      "Architect": {
        id: "5.1",
        name: "Architect",
        questions: [
          "What type of project is it? (e.g., new build, extension, renovation)",
          "Do you already have a concept or floorplan?",
          "Do you need full planning and building permit drawings?",
          "What is the size of the building or area (m²)?",
          "When should the architect start?",
          "What is your budget range for the project?"
        ]
      },
      "Interior Designer": {
        id: "5.2",
        name: "Interior Designer",
        questions: [
          "What type of interior design service do you need?",
          "Which rooms or areas are involved?",
          "Do you have a specific style preference?",
          "What is your budget range?",
          "When would you like to start the project?",
          "Do you need help with furniture selection?"
        ]
      },
      "Structural Designer": {
        id: "5.3",
        name: "Structural Designer",
        questions: [
          "What part of the structure needs assessment or design?",
          "Do you already have architectural plans?",
          "Is the project residential or commercial?",
          "Are calculations or reinforcement plans needed?",
          "When do you need the structural design?",
          "What is the project timeline?"
        ]
      }
    }
  },
  "Maintenance & Repairs": {
    id: 6,
    name: "Maintenance & Repairs",
    icon: "maintenance-icon",
    subcategories: {
      "General Maintenance": {
        id: "6.1",
        name: "General Maintenance",
        questions: [
          "What type of maintenance work is needed?",
          "Is this preventive or corrective maintenance?",
          "How often do you need this service?",
          "What is the size of the property?",
          "When do you need the service?",
          "Do you have any specific requirements?"
        ]
      },
      "Appliance Repair": {
        id: "6.2",
        name: "Appliance Repair",
        questions: [
          "What type of appliance needs repair?",
          "What is the make and model?",
          "What is the specific problem?",
          "Is the appliance still under warranty?",
          "When do you need the repair?",
          "Do you have the appliance manual?"
        ]
      },
      "Furniture Repair": {
        id: "6.3",
        name: "Furniture Repair",
        questions: [
          "What type of furniture needs repair?",
          "What is the specific damage or issue?",
          "What material is the furniture made of?",
          "Do you have replacement parts?",
          "When do you need the repair?",
          "Is this a family heirloom or valuable piece?"
        ]
      }
    }
  },
  "Digital & Tech": {
    id: 7,
    name: "Digital & Tech",
    icon: "tech-icon",
    subcategories: {
      "IT Support": {
        id: "7.1",
        name: "IT Support",
        questions: [
          "What type of IT issue are you experiencing?",
          "What devices are affected?",
          "Is this for home or business?",
          "When did the problem start?",
          "What have you already tried to fix it?",
          "When do you need the support?"
        ]
      },
      "Website Development": {
        id: "7.2",
        name: "Website Development",
        questions: [
          "What type of website do you need?",
          "Do you have existing content or need help creating it?",
          "What is your target audience?",
          "Do you need e-commerce functionality?",
          "What is your budget range?",
          "When do you need the website completed?"
        ]
      },
      "Software Installation": {
        id: "7.3",
        name: "Software Installation",
        questions: [
          "What software needs to be installed?",
          "On how many computers?",
          "Do you have the software licenses?",
          "Do you need training on the software?",
          "When do you need the installation?",
          "Are there any compatibility requirements?"
        ]
      }
    }
  },
  "Media & Creative": {
    id: 8,
    name: "Media & Creative",
    icon: "media-icon",
    subcategories: {
      "Photography": {
        id: "8.1",
        name: "Photography",
        questions: [
          "What type of photography do you need?",
          "Where will the photoshoot take place?",
          "How many people will be photographed?",
          "Do you need editing and retouching?",
          "When do you need the photos?",
          "What is your budget range?"
        ]
      },
      "Video Production": {
        id: "8.2",
        name: "Video Production",
        questions: [
          "What type of video do you need?",
          "How long should the video be?",
          "Where will the filming take place?",
          "Do you need editing and post-production?",
          "When do you need the video completed?",
          "What is your budget range?"
        ]
      },
      "Graphic Design": {
        id: "8.3",
        name: "Graphic Design",
        questions: [
          "What type of design work do you need?",
          "Do you have existing brand guidelines?",
          "What format do you need the final files in?",
          "Do you need multiple versions or sizes?",
          "When do you need the design completed?",
          "What is your budget range?"
        ]
      }
    }
  },
  "Business & Facility Services": {
    id: 9,
    name: "Business & Facility Services",
    icon: "business-icon",
    subcategories: {
      "Office Setup": {
        id: "9.1",
        name: "Office Setup",
        questions: [
          "What type of office setup do you need?",
          "How many workstations are required?",
          "What is the size of the office space?",
          "Do you need IT infrastructure setup?",
          "When do you need the office ready?",
          "What is your budget range?"
        ]
      },
      "Event Planning": {
        id: "9.2",
        name: "Event Planning",
        questions: [
          "What type of event are you planning?",
          "How many guests are expected?",
          "Where will the event take place?",
          "What services do you need?",
          "When is the event date?",
          "What is your budget range?"
        ]
      },
      "Security Services": {
        id: "9.3",
        name: "Security Services",
        questions: [
          "What type of security service do you need?",
          "Is this for residential or commercial property?",
          "What is the size of the area to secure?",
          "Do you need 24/7 monitoring?",
          "When do you need the service to start?",
          "What is your budget range?"
        ]
      }
    }
  },
  "Transport & Moving": {
    id: 10,
    name: "Transport & Moving",
    icon: "transport-icon",
    subcategories: {
      "Moving Services": {
        id: "10.1",
        name: "Moving Services",
        questions: [
          "What type of move is this?",
          "How many rooms need to be moved?",
          "What is the distance of the move?",
          "Do you need packing services?",
          "When is your preferred moving date?",
          "Do you have any fragile or valuable items?"
        ]
      },
      "Delivery Services": {
        id: "10.2",
        name: "Delivery Services",
        questions: [
          "What needs to be delivered?",
          "What is the pickup and delivery address?",
          "What is the size and weight of the items?",
          "When do you need the delivery?",
          "Is this a one-time or regular service?",
          "Do the items require special handling?"
        ]
      },
      "Vehicle Services": {
        id: "10.3",
        name: "Vehicle Services",
        questions: [
          "What type of vehicle service do you need?",
          "What is the make and model of the vehicle?",
          "What is the specific issue or service needed?",
          "When do you need the service?",
          "Do you need a loaner vehicle?",
          "Is the vehicle still under warranty?"
        ]
      }
    }
  },
  "Rental & Equipment": {
    id: 11,
    name: "Rental & Equipment",
    icon: "rental-icon",
    subcategories: {
      "Tool Rental": {
        id: "11.1",
        name: "Tool Rental",
        questions: [
          "What tools do you need to rent?",
          "How long do you need them for?",
          "Do you need delivery and pickup?",
          "Do you need training on how to use the tools?",
          "When do you need the tools?",
          "What is your budget range?"
        ]
      },
      "Equipment Rental": {
        id: "11.2",
        name: "Equipment Rental",
        questions: [
          "What type of equipment do you need?",
          "What is the size and capacity required?",
          "How long do you need it for?",
          "Do you need setup and operation assistance?",
          "When do you need the equipment?",
          "What is your budget range?"
        ]
      },
      "Party Equipment": {
        id: "11.3",
        name: "Party Equipment",
        questions: [
          "What type of party equipment do you need?",
          "How many guests are expected?",
          "Where will the event take place?",
          "Do you need setup and takedown services?",
          "When is the event date?",
          "What is your budget range?"
        ]
      }
    }
  },
  "Project Management": {
    id: 12,
    name: "Project Management",
    icon: "project-icon",
    subcategories: {
      "Construction Project Management": {
        id: "12.1",
        name: "Construction Project Management",
        questions: [
          "What type of construction project is it?",
          "What is the project timeline?",
          "What is the project budget?",
          "Do you have architectural plans?",
          "When do you need the project to start?",
          "What permits are required?"
        ]
      },
      "Event Project Management": {
        id: "12.2",
        name: "Event Project Management",
        questions: [
          "What type of event are you managing?",
          "How many attendees are expected?",
          "What is the event budget?",
          "Where will the event take place?",
          "When is the event date?",
          "What services do you need coordinated?"
        ]
      }
    }
  },
  "Administrative & Permits": {
    id: 13,
    name: "Administrative & Permits",
    icon: "admin-icon",
    subcategories: {
      "Permit Applications": {
        id: "13.1",
        name: "Permit Applications",
        questions: [
          "What type of permit do you need?",
          "What is the project description?",
          "What is the property address?",
          "Do you have the required documentation?",
          "When do you need the permit?",
          "Have you applied for permits before?"
        ]
      },
      "Documentation Services": {
        id: "13.2",
        name: "Documentation Services",
        questions: [
          "What type of documentation do you need?",
          "What is the purpose of the documentation?",
          "Do you have existing documents to work with?",
          "When do you need the documentation?",
          "What format do you need it in?",
          "Do you need notarization or certification?"
        ]
      }
    }
  },
  "Outdoor & Landscaping": {
    id: 14,
    name: "Outdoor & Landscaping",
    icon: "outdoor-icon",
    subcategories: {
      "Pool Construction": {
        id: "14.1",
        name: "Pool Construction",
        questions: [
          "What type of pool do you want?",
          "What is the desired size and shape?",
          "Do you have a preferred location?",
          "What features do you want included?",
          "When do you want construction to start?",
          "What is your budget range?"
        ]
      },
      "Deck Construction": {
        id: "14.2",
        name: "Deck Construction",
        questions: [
          "What type of deck do you want?",
          "What materials do you prefer?",
          "What is the desired size?",
          "Do you have existing plans?",
          "When do you want construction to start?",
          "What is your budget range?"
        ]
      }
    }
  },
  "Interior & Finishing": {
    id: 15,
    name: "Interior & Finishing",
    icon: "interior-icon",
    subcategories: {
      "Flooring Installation": {
        id: "15.1",
        name: "Flooring Installation",
        questions: [
          "What type of flooring do you want?",
          "What is the size of the area?",
          "Do you have existing flooring to remove?",
          "What is your preferred timeline?",
          "Do you need subfloor preparation?",
          "What is your budget range?"
        ]
      },
      "Kitchen Renovation": {
        id: "15.2",
        name: "Kitchen Renovation",
        questions: [
          "What type of kitchen renovation do you want?",
          "Do you want to keep the existing layout?",
          "What appliances do you need?",
          "What is your preferred timeline?",
          "Do you need design consultation?",
          "What is your budget range?"
        ]
      }
    }
  },
  "Technical & Installation": {
    id: 16,
    name: "Technical & Installation",
    icon: "technical-icon",
    subcategories: {
      "Security System Installation": {
        id: "16.1",
        name: "Security System Installation",
        questions: [
          "What type of security system do you want?",
          "How many cameras and sensors do you need?",
          "Do you want wired or wireless systems?",
          "Do you need monitoring services?",
          "When do you want installation?",
          "What is your budget range?"
        ]
      },
      "Solar Panel Installation": {
        id: "16.2",
        name: "Solar Panel Installation",
        questions: [
          "What is your energy consumption?",
          "What is the size of your roof?",
          "Do you have a preferred solar panel brand?",
          "Do you need battery storage?",
          "When do you want installation?",
          "What is your budget range?"
        ]
      }
    }
  },
  "Specialist Services": {
    id: 17,
    name: "Specialist Services",
    icon: "specialist-icon",
    subcategories: {
      "Legal Services": {
        id: "17.1",
        name: "Legal Services",
        questions: [
          "What type of legal service do you need?",
          "Is this for personal or business matters?",
          "Do you have existing documents?",
          "What is your preferred timeline?",
          "Do you need representation or consultation?",
          "What is your budget range?"
        ]
      },
      "Financial Services": {
        id: "17.2",
        name: "Financial Services",
        questions: [
          "What type of financial service do you need?",
          "Is this for personal or business finances?",
          "Do you have existing financial documents?",
          "What is your preferred timeline?",
          "Do you need ongoing support?",
          "What is your budget range?"
        ]
      }
    }
  }
};

// Helper function to get all categories
export const getAllCategories = () => {
  return Object.values(categoriesData).map(category => ({
    id: category.id,
    name: category.name,
    icon: category.icon
  }));
};

// Helper function to get subcategories for a category
export const getSubcategories = (categoryName) => {
  const category = categoriesData[categoryName];
  return category ? Object.values(category.subcategories) : [];
};

// Helper function to get questions for a subcategory
export const getQuestions = (categoryName, subcategoryName) => {
  const category = categoriesData[categoryName];
  if (category && category.subcategories[subcategoryName]) {
    return category.subcategories[subcategoryName].questions;
  }
  return [];
};

// Helper function to get all subcategories across all categories
export const getAllSubcategories = () => {
  const allSubcategories = [];
  Object.values(categoriesData).forEach(category => {
    Object.values(category.subcategories).forEach(subcategory => {
      allSubcategories.push({
        ...subcategory,
        categoryName: category.name,
        categoryId: category.id
      });
    });
  });
  return allSubcategories;
};
