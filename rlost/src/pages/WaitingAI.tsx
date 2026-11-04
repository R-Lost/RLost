import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getGenerativeModel } from "firebase/ai";
import { searchLostItems, type SearchLostItemsData } from "@dataconnect/generated";
import { ai, dataConnect } from "../firebase";

// Create model
const model = getGenerativeModel(ai, { model: "gemini-3.5-flash-lite" });

const locations =[
    "Aberdeen-Inverness Residence Hall (AI)",
    "Academic Resource Center (ARC)",
    "Advanced Neuroimaging Building (ANI)",
    "Agricultural Operations (AGOPS)",
    "Alumni & Visitors Center (AVC)",
    "Amy S. Harrison Field (ASHF)",
    "Anderson Hall (ANDHL)",
    "Arts Building (ARTS)",
    "Athletics & Dance Building (ATHD)",
    "Bannockburn Village (BANN)",
    "Batchelor Hall (BATCH)",
    "Bell Tower (BELL)",
    "Biological Sciences Building (BIOL)",
    "Botanic Gardens (BOTG)",
    "Bourns Hall (BRNHL)",
    "Boyce Hall (BOYCE)",
    "Bytes Cafe (BYTES)",
    "Campbell Hall (CAMPB)",
    "Campus Store / Bookstore (BKSTR)",
    "Career Center (CAREER)",
    "Chapman Hall (CHAP)",
    "CHASS Interdisciplinary North (INTN)",
    "CHASS Interdisciplinary South (INTS)",
    "Chemical Sciences (CHEMS)",
    "Child Development Center (CDC)",
    "Citrus Research Center (CRC)",
    "Coffee Bean & Tea Leaf (CBTL)",
    "College Building North (CBN)",
    "College Building South (CBS)",
    "Corporation Yard (CORP)",
    "Costo Hall (COSTO)",
    "Culver Center of the Arts (CULVR)",
    "Dundee Residence Hall (DUND)",
    "East Campus Student Services Building (ECSSB)",
    "Emerbee's Cafe (EMRB)",
    "Entomology Building (ENTOM)",
    "Entomology Research Museum (ENTM)",
    "Environmental Health & Safety (EHS)",
    "Falkirk Apartments (FALK)",
    "Fawcett Laboratory (FAWCT)",
    "Genomics Building (GENOM)",
    "Geology Building (GEOL)",
    "Glasgow Residential Restaurant (GLASG)",
    "Glen Mor Market (GMMKT)",
    "Glen Mor Residence Hall (GM)",
    "Greenhouses (GRNHS)",
    "Herbarium (HERB)",
    "Highlander One-Stop Shop (HOSS)",
    "Highlander Union Building (HUB)",
    "Hinderaker Hall (HINDR)",
    "Humanities & Social Sciences (HMNSS)",
    "Humanities 400 / University Theatre (UNIVT)",
    "Humanities 1500 (HUM15)",
    "Insectary & Quarantine Facility (INSEC)",
    "International Village (INTV)",
    "Ivan's at Hinderaker (IVANS)",
    "Keen Hall (KEEN)",
    "KUCR Radio Station (KUCR)",
    "Life Sciences Building (LFSC)",
    "Life Sciences 1500 (LS15)",
    "Lothian Residence Hall (LOTH)",
    "Lothian Residential Restaurant (LOTHR)",
    "Materials Science & Engineering (MSE)",
    "Mobility Hub (MOBH)",
    "Multidisciplinary Research Building (MRB)",
    "North District Apartments (ND)",
    "North District Market (NDMKT)",
    "Oban Family Housing (OBAN)",
    "Olmsted Hall (OLMH)",
    "Orbach Science Library (ORBL)",
    "Parking Structure 1 (PS1)",
    "Parking Structure 2 (PS2)",
    "Pentland Hills Residence Hall (PENT)",
    "Physics Building (PHY)",
    "Physics 2000 (PHY2)",
    "Pierce Hall (PIERC)",
    "Plant Growth Environments Facility (PGEF)",
    "Plant Research 1 (PR1)",
    "Plant Transformation Research Center (PTRC)",
    "Plaza Apartments (PLAZA)",
    "Psychology Building (PSYCH)",
    "Rivera Library (RIVL)",
    "School of Business Building (SBB)",
    "School of Medicine Education Building I (SOM1)",
    "School of Medicine Education Building II (SOM2)",
    "School of Medicine Research Building (SOMR)",
    "Science Laboratories 1 (SCIL1)",
    "Scotty's Convenience Store - Glen Mor (SCOTGM)",
    "Scotty's Convenience Store - HUB (SCOTHUB)",
    "Skye Hall (SKYE)",
    "Spieth Hall (SPTH)",
    "Sproul Hall (SPRL)",
    "Stonehaven Apartments (STNHV)",
    "Student Health and Counseling Center (SHCC)",
    "Student Recreation Center (SRC)",
    "Student Services Building (SSB)",
    "Student Success Center (SSC)",
    "Surge Building (SURGE)",
    "The Barn (BARN)",
    "Transportation & Parking Services (TAPS)",
    "UCR ARTS: California Museum of Photography (CMP)",
    "UCR Community Garden (GARDN)",
    "UCR Extension Center (UNEX)",
    "UCR Police Department (UCRPD)",
    "Undergraduate Teaching & Learning Facility (UTLF)",
    "University Lecture Hall (UNLH)",
    "University Office Building (UOB)",
    "University Plaza (UPLZ)",
    "University Village (UV)",
    "USDA Salinity Laboratory (USDA)",
    "Veitch Student Center (VEITC)",
    "Watkins Hall (WAT)",
    "Watkins 1000 (WAT1)",
    "Webber Hall (WEBBR)",
    "Winston Chung Hall (WCH)",
];

const categories = [
    "Electronics",
    "Clothing",
    "Accessories",
    "Documents",
    "Other",
];

type LostItem = SearchLostItemsData["items"][number];

function normalize(value: string) {
    return value.toLowerCase().trim();
}

function getKeywords(text: string) {
    return text
        .split(",")
        .map((keyword) => normalize(keyword))
        .filter(Boolean);
}

function scoreItem(item: LostItem, keywords: string[]) {
    const searchableText = normalize([
        item.itemName,
        item.description ?? "",
        item.location ?? "",
        item.category ?? "",
    ].join(" "));

    return keywords.reduce(
        (score, keyword) => score + (searchableText.includes(keyword) ? 1 : 0), 0,
    );
}

function WaitingAI() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [keywords, setKeywords] = useState<string | null>(null);

    useEffect(() => {
        if (!query) {
            return;
        }
        let ignore = false;
        async function run() {
            // Prompt
            const prompt = "This is a lost and found website. The user is searching for a lost item. The item is a " + query + ". We need to search the database, give 5-15 keywords to search the database for. Reply with only the keywords, separated by commas."

            const result = await model.generateContent(prompt);
            if (!ignore)
                setKeywords(result.response.text());
        }

        run();
        return () => {
            ignore = true;
        }
    }, [query]);

    if (!query) {
        return <>
            <h2>Error</h2>
        </>
    }

    return <>
        <h2>Searching Database for "{query}"</h2>
        <h2>Searching under</h2>
        <h2>{keywords}</h2>
    </>
}

export default WaitingAI