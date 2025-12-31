// Utility to parse CSV files and extract questions by category and subcategory

// Map category names to CSV file names
const categoryToCsvFile = {
    "Cleaning Services": "Cleaning_Services_Questions__FINAL_.csv",
    "Maintenance & Repairs": "Maintenance___Repairs_Questions__FINAL_.csv",
    "Technical & Construction": "Technical___Construction_Questions__Cleaned_.csv",
    "Garden & Outdoor": "Garden___Outdoor_Questions__FINAL_.csv",
    "Home & Comfort": "Home___Comfort_Questions__FINAL_.csv",
    "Design & Planning": "Design___Planning_Questions__FINAL_.csv",
    "Digital & Tech": "Digital___Tech_Questions__FINAL_.csv",
    "Media & Creative": "Media___Creative_Questions__FINAL_.csv",
    "Business & Facility Services": "Business___Facility_Services_Questions__FINAL_.csv",
    "Transport & Moving": "Transport___Moving_Questions__FINAL_.csv",
    "Rental & Equipment": "Rental___Equipment_Questions__FINAL_.csv",
    "Project Management": "Project_Management_Questions__FINAL_.csv",
    "Administrative & Permits": "Administrative___Permits_Questions__FINAL_.csv",
    "Outdoor & Landscaping": "Outdoor___Landscaping_Questions__FINAL_.csv",
    "Interior & Finishing": "Interior___Finishing_Questions__FINAL_.csv",
    "Technical & Installation": "Technical___Installation_Questions__FINAL_.csv",
    "Specialist Services": "Specialist_Services_Questions__FINAL_.csv",
};

// Cache for parsed CSV data
const csvDataCache = {};

// Parse CSV text into structured data
function parseCSV( csvText ) {
    const lines = csvText.split( '\n' ).filter( line => line.trim() );
    const headers = lines[0].split( ',' ).map( h => h.trim() );

    const data = [];
    for ( let i = 1; i < lines.length; i++ ) {
        const line = lines[i];
        // Handle CSV with quoted fields that may contain commas
        const values = [];
        let currentValue = '';
        let inQuotes = false;

        for ( let j = 0; j < line.length; j++ ) {
            const char = line[j];
            if ( char === '"' ) {
                inQuotes = !inQuotes;
            } else if ( char === ',' && !inQuotes ) {
                values.push( currentValue.trim() );
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push( currentValue.trim() );

        if ( values.length >= 3 ) {
            data.push( {
                mainCategory: values[0]?.trim() || '',
                subcategory: values[1]?.trim() || '',
                question: values[2]?.trim() || '',
            } );
        }
    }

    return data;
}

// Load and parse a CSV file
async function loadCSVFile( categoryName ) {
    const csvFileName = categoryToCsvFile[categoryName];
    if ( !csvFileName ) {
        console.warn( `No CSV file found for category: ${categoryName}` );
        return [];
    }

    // Check cache first
    if ( csvDataCache[csvFileName] ) {
        return csvDataCache[csvFileName];
    }

    try {
        // Load from public folder with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout( () => controller.abort(), 10000 ); // 10 second timeout

        const response = await fetch( `/Category_subCategory_Questions/${csvFileName}`, {
            signal: controller.signal
        } );

        clearTimeout( timeoutId );

        if ( !response.ok ) {
            console.warn( `Failed to load CSV file: ${csvFileName} - Status: ${response.status}` );
            return [];
        }

        const csvText = await response.text();
        const parsedData = parseCSV( csvText );

        // Cache the parsed data
        csvDataCache[csvFileName] = parsedData;

        return parsedData;
    } catch ( error ) {
        if ( error.name === 'AbortError' ) {
            console.error( `Timeout loading CSV file ${csvFileName}` );
        } else {
            console.error( `Error loading CSV file ${csvFileName}:`, error );
        }
        return [];
    }
}

// Extract subcategory name from CSV format (e.g., "1.1 General Cleaning" -> "General Cleaning")
function extractSubcategoryName( subcategoryString ) {
    // Remove the number prefix (e.g., "1.1 ", "4.1 ", etc.)
    return subcategoryString.replace( /^\d+\.\d+\s*/, '' ).trim();
}

// Get all subcategories for a category from CSV
export async function getSubcategoriesFromCSV( categoryName ) {
    const csvData = await loadCSVFile( categoryName );
    console.log( `[CSV Parser] Loaded ${csvData.length} rows for category: ${categoryName}` );

    // Extract unique subcategories
    const subcategoryMap = new Map();

    csvData.forEach( row => {
        if ( row.mainCategory === categoryName && row.subcategory ) {
            const subcategoryName = extractSubcategoryName( row.subcategory );
            if ( subcategoryName && !subcategoryMap.has( subcategoryName ) ) {
                subcategoryMap.set( subcategoryName, {
                    name: subcategoryName,
                    originalString: row.subcategory,
                } );
            }
        }
    } );

    const result = Array.from( subcategoryMap.values() );
    console.log( `[CSV Parser] Found ${result.length} subcategories:`, result.map( s => s.name ) );
    return result;
}

// Get all questions for a specific subcategory from CSV
export async function getQuestionsFromCSV( categoryName, subcategoryName ) {
    const csvData = await loadCSVFile( categoryName );
    console.log( `[CSV Parser] Looking for questions: ${categoryName} -> ${subcategoryName}` );

    // Find questions matching the category and subcategory
    const questions = [];
    const subcategoryNameLower = subcategoryName.toLowerCase().trim();

    csvData.forEach( row => {
        if ( row.mainCategory === categoryName && row.subcategory ) {
            const extractedName = extractSubcategoryName( row.subcategory ).toLowerCase().trim();
            // Try exact match first
            if ( extractedName === subcategoryNameLower ) {
                if ( row.question && !questions.includes( row.question ) ) {
                    questions.push( row.question );
                }
            }
        }
    } );

    console.log( `[CSV Parser] Exact match found ${questions.length} questions` );

    // If no exact match found, try partial matching
    if ( questions.length === 0 ) {
        csvData.forEach( row => {
            if ( row.mainCategory === categoryName && row.subcategory ) {
                const extractedName = extractSubcategoryName( row.subcategory ).toLowerCase().trim();
                // Try partial match
                if ( extractedName.includes( subcategoryNameLower ) ||
                    subcategoryNameLower.includes( extractedName ) ) {
                    if ( row.question && !questions.includes( row.question ) ) {
                        questions.push( row.question );
                    }
                }
            }
        } );
        console.log( `[CSV Parser] Partial match found ${questions.length} questions` );
    }

    return questions;
}

// Get all questions for a category (all subcategories combined)
export async function getAllQuestionsForCategory( categoryName ) {
    const csvData = await loadCSVFile( categoryName );

    return csvData
        .filter( row => row.mainCategory === categoryName && row.question )
        .map( row => row.question );
}

