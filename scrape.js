const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=20',
    'https://sanand0.github.io/tdsdata/js_table/?seed=21',
    'https://sanand0.github.io/tdsdata/js_table/?seed=22',
    'https://sanand0.github.io/tdsdata/js_table/?seed=23',
    'https://sanand0.github.io/tdsdata/js_table/?seed=24',
    'https://sanand0.github.io/tdsdata/js_table/?seed=25',
    'https://sanand0.github.io/tdsdata/js_table/?seed=26',
    'https://sanand0.github.io/tdsdata/js_table/?seed=27',
    'https://sanand0.github.io/tdsdata/js_table/?seed=28',
    'https://sanand0.github.io/tdsdata/js_table/?seed=29'
  ];
  
  let grandTotal = 0;
  
  for (const url of urls) {
    console.log(`Scraping: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for tables to load (dynamic content)
    await page.waitForSelector('table');
    
    // Find all table cells with numbers
    const numbers = await page.$$eval('table td, table th', cells => 
      cells.flatMap(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        return isNaN(num) ? [] : [num];
      })
    );
    
    const tableSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Table sum for ${url}: ${tableSum}`);
    grandTotal += tableSum;
  }
  
  console.log(`GRAND TOTAL SUM: ${grandTotal}`);
  await browser.close();
})();
