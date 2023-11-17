export default class CSVProcessor{
    constructor(){}
    static processIpos(iposList){
        let iposData = [], itemIndex = 0, m = new Map();
        for(let ipo of iposList){
            if(itemIndex === 0){
                ipo.map((key: string, index: number) => {
                    m.set(key, index);
                });
            }else{
                let ipoObject = {
                    id: ipo[m.get("id")],
                    ipo_id: ipo[m.get("ipo_id")],
                    object_id: ipo[m.get("object_id")],
                    valuation_amount: ipo[m.get("valuation_amount")],
                    valuation_currency_code: ipo[m.get("valuation_currency_code")],
                    raised_amount: ipo[m.get("raised_amount")],
                    raised_currency_code: ipo[m.get("raised_currency_code")],
                    public_at: ipo[m.get("public_at")],
                    stock_symbol: ipo[m.get("stock_symbol")],
                    source_url: ipo[m.get("source_url")],
                    source_description: ipo[m.get("source_description")],
                };
                iposData.push(ipoObject);
            }
            itemIndex++;
        }
        return iposData;
    }
}