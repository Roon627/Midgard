/**
 * Passport number validation rules by country
 * Each rule contains:
 * - pattern: Regular expression to validate the passport number format
 * - message: Error message to display if validation fails
 * - description: Additional information about the passport format (optional)
 */
const passportRules = {
    "Afghanistan": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Afghan passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Albania": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Albanian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Algeria": {
        pattern: /^\d{9}$/,
        message: "Algerian passport numbers must be 9 digits.",
        description: "Format: 000000000"
      },
      "Angola": {
        pattern: /^[A-Z]\d{8}$/,
        message: "Angolan passport numbers must be 1 letter followed by 8 digits.",
        description: "Format: X00000000"
      },
      "Argentina": {
        pattern: /^[A-Z]{3}\d{6}$/,
        message: "Argentine passport numbers must be 3 letters followed by 6 digits.",
        description: "Format: XXX000000"
      },
      "Armenia": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Armenian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Australia": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Australian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Austria": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Austrian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Azerbaijan": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Azerbaijani passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Bahamas": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Bahamian passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Bahrain": {
        pattern: /^\d{8}$/,
        message: "Bahraini passport numbers must be 8 digits.",
        description: "Format: 00000000"
      },
      "Bangladesh": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Bangladeshi passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Barbados": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Barbadian passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Belarus": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Belarusian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Belgium": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Belgian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Belize": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Belizean passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Benin": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Beninese passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Bhutan": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Bhutanese passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Bolivia": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Bolivian passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Bosnia and Herzegovina": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Bosnian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Botswana": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Botswanan passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Brazil": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Brazilian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Brunei": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Bruneian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Bulgaria": {
        pattern: /^\d{9}$/,
        message: "Bulgarian passport numbers must be 9 digits.",
        description: "Format: 000000000"
      },
      "Burkina Faso": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Burkina Faso passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Burundi": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Burundian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Cambodia": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Cambodian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Cameroon": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Cameroonian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Canada": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Canadian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Cape Verde": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Cape Verdean passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Central African Republic": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Central African Republic passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Chad": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Chadian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Chile": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Chilean passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "China": {
        pattern: /^[GEMA]\d{8}$/,
        message: "Chinese passport numbers must start with G, E, M or A followed by 8 digits.",
        description: "Format: X00000000"
      },
      "Colombia": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Colombian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Comoros": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Comorian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Costa Rica": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Costa Rican passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Croatia": {
        pattern: /^\d{9}$/,
        message: "Croatian passport numbers must be 9 digits.",
        description: "Format: 000000000"
      },
      "Cuba": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Cuban passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Cyprus": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Cypriot passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Czech Republic": {
        pattern: /^\d{8}$/,
        message: "Czech passport numbers must be 8 digits.",
        description: "Format: 00000000"
      },
      "Denmark": {
        pattern: /^[A-Z]\d{8}$/,
        message: "Danish passport numbers must be 1 letter followed by 8 digits.",
        description: "Format: X00000000"
      },
      "Djibouti": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Djiboutian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Dominican Republic": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Dominican passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Ecuador": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Ecuadorian passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Egypt": {
        pattern: /^[A-Z]\d{8}$/,
        message: "Egyptian passport numbers must be 1 letter followed by 8 digits.",
        description: "Format: X00000000"
      },
      "El Salvador": {
        pattern: /^[A-Z]\d{8}$/,
        message: "Salvadoran passport numbers must be 1 letter followed by 8 digits.",
        description: "Format: X00000000"
      },
      "Eritrea": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Eritrean passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Estonia": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Estonian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Ethiopia": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Ethiopian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Fiji": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Fijian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Finland": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Finnish passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "France": {
        pattern: /^\d{2}[A-Z]{2}\d{5}$/,
        message: "French passport numbers must be 2 digits, 2 letters, then 5 digits.",
        description: "Format: 00XX00000"
      },
      "Gabon": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Gabonese passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Gambia": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Gambian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Georgia": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Georgian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Germany": {
        pattern: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
        message: "German passport numbers are 9 alphanumeric characters (excluding vowels and some consonants).",
        description: "Format: XXXXXXXXX (excluding vowels A,E,I,O,U and also B,D,Q,S)"
      },
      "Ghana": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Ghanaian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Greece": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Greek passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Guatemala": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Guatemalan passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Guinea": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Guinean passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Guyana": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Guyanese passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Haiti": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Haitian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Honduras": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Honduran passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Hong Kong": {
        pattern: /^[A-Z]\d{8}$/,
        message: "Hong Kong passport numbers must be 1 letter followed by 8 digits.",
        description: "Format: X00000000"
      },
      "Hungary": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Hungarian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Iceland": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Icelandic passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "India": {
        pattern: /^[A-Z]{1}[0-9]{7}$/,
        message: "Indian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Indonesia": {
        pattern: /^[A-Z]{1,2}\d{7}$/,
        message: "Indonesian passport numbers must be 1-2 letters followed by 7 digits.",
        description: "Format: X0000000 or XX0000000"
      },
      "Iran": {
        pattern: /^[A-Z]\d{8}$/,
        message: "Iranian passport numbers must be 1 letter followed by 8 digits.",
        description: "Format: X00000000"
      },
      "Iraq": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Iraqi passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Ireland": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Irish passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Israel": {
        pattern: /^\d{8}$/,
        message: "Israeli passport numbers must be 8 digits.",
        description: "Format: 00000000"
      },
      "Italy": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Italian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Jamaica": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Jamaican passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Japan": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Japanese passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Jordan": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Jordanian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Kazakhstan": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Kazakhstani passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Kenya": {
        pattern: /^[A-Z]{1,2}\d{7}$/,
        message: "Kenyan passport numbers must be 1-2 letters followed by 7 digits.",
        description: "Format: X0000000 or XX0000000"
      },
      "Kiribati": {
        pattern: /^[A-Z]\d{6}$/,
        message: "Kiribati passport numbers must be 1 letter followed by 6 digits.",
        description: "Format: X000000"
      },
      "Kuwait": {
        pattern: /^\d{8}$/,
        message: "Kuwaiti passport numbers must be 8 digits.",
        description: "Format: 00000000"
      },
      "Kyrgyzstan": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Kyrgyz passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Laos": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Laotian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Latvia": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Latvian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Lebanon": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Lebanese passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Lesotho": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Lesotho passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Liberia": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Liberian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Libya": {
        pattern: /^\d{8}$/,
        message: "Libyan passport numbers must be 8 digits.",
        description: "Format: 00000000"
      },
      "Liechtenstein": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Liechtenstein passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Lithuania": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Lithuanian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Luxembourg": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Luxembourg passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Macao": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Macanese passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Madagascar": {
        pattern: /^\d{9}$/,
        message: "Malagasy passport numbers must be 9 digits.",
        description: "Format: 000000000"
      },
      "Malawi": {
        pattern: /^[A-Z]{2}\d{7}$/,
        message: "Malawian passport numbers must be 2 letters followed by 7 digits.",
        description: "Format: XX0000000"
      },
      "Malaysia": {
        pattern: /^[A-Z]\d{8}$/,
        message: "Malaysian passport numbers must be 1 letter followed by 8 digits.",
        description: "Format: X00000000"
      },
      "Maldives": {
        pattern: /^A\d{6,}$/,
        message: "Maldivian passport numbers must start with 'A' followed by at least 6 digits.",
        description: "Format: A000000+"
      },
      "Mali": {
        pattern: /^[A-Z]\d{7}$/,
        message: "Malian passport numbers must be 1 letter followed by 7 digits.",
        description: "Format: X0000000"
      },
      "Malta": {
        pattern: /^\d{7}$/,
        message: "Maltese passport numbers must be 7 digits.",
        description: "Format: 0000000"
      },
      "Marshall Islands": {
        pattern: /^\d{8}$/,
        message: "Marshall Islands passport numbers must be 8 digits.",
        description: "Format: 00000000"
      },
      "Mauritania": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Mauritanian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Mauritius": {
        pattern: /^[A-Z]{2}\d{6}$/,
        message: "Mauritian passport numbers must be 2 letters followed by 6 digits.",
        description: "Format: XX000000"
      },
      "Mexico": {
        pattern: /^\d{8}$/,
        message: "Mexican passport numbers must be 8 digits.",
        description: "Format: 00000000"
      },
      "Micronesia": {
        pattern: /^\d{8}$/,
        message: "Micronesian passport numbers must be 8 digits.",
        description: "Format: 00000000"
      },
      "Moldova": {
        pattern: /^[A-Z]\d{8}$/,
        message: "Moldovan passport numbers must be 1 letter followed by 8 digits.",
        description: "Format: X00000000"
      },
      "Monaco": {
        pattern: /^\d{6}$/,
        message: "Monaco passport numbers must be 6 digits."
      }
    };
  
  /**
   * Validates a passport number for a specific country
   * 
   * @param {string} country - The name of the country
   * @param {string} passportNumber - The passport number to validate
   * @returns {Object} Result with valid status and error message if invalid
   */
  export function validatePassportNumber(country, passportNumber) {
    // Return early if no passport number provided
    if (!passportNumber || passportNumber.trim() === '') {
      return { 
        valid: false, 
        message: "Passport number cannot be empty." 
      };
    }
  
    const rule = passportRules[country];
    
    // Allow if no rule defined for the country
    if (!rule) {
      return { 
        valid: true,
        message: "" 
      };
    }
    
    const isValid = rule.pattern.test(passportNumber.trim());
    
    return { 
      valid: isValid, 
      message: isValid ? "" : rule.message 
    };
  }
  
  /**
   * Gets the passport format description for a specific country
   * 
   * @param {string} country - The name of the country
   * @returns {string} Description of the passport format or empty string if not found
   */
  export function getPassportFormatDescription(country) {
    const rule = passportRules[country];
    return rule && rule.description ? rule.description : "";
  }
  
  /**
   * Returns the list of all countries with passport validation rules
   * 
   * @returns {Array} List of country names
   */
  export function getSupportedCountries() {
    return Object.keys(passportRules).sort();
  }
  
  export default passportRules;