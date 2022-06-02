const puppeteer = require('puppeteer');
// Data Arrays
// There is an option to send the data as an arguments
// Bugs: Name must has first and second name & the phone field must not acceptting letters!!
const dataMap = new Map([["#name","amere"],["#email","aq@gmail.com"],["#phone","+972509376658"],["#company","Amere-Tech"]]);

(async () => {
  // Launch the browser and the website
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://contractorsinsurancereview.com/ExampleForm/')
  // Type the values in the input field
  for(const [key,value] of dataMap){
    await page.type(key,value);
  }
  await page.select("#employees","51-500")
  // Make a screenshot and save it then close the browser 
  await page.screenshot({ path: 'img1.png', fullPage: 'true' });
  // Click the "Request a Call Back" button
  await page.click('button.primary.button');
  await page.screenshot({ path: 'img2.png', fullPage: 'true' });
  
  const tuPage = await page.$x("//h1[contains(text(), 'Thank You')]");
  
  // Check if there is a thank you text in the page
  if(tuPage.length > 0)
    console.log("Thank you");
  else
    throw new Error("ERROR!!");

  await browser.close();
})()