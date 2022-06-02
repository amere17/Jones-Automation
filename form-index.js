const puppeteer = require('puppeteer');
// Data Arrays
// there is an option to send the data as an arguments
//Bugs: Name must has first and second name & the phone field must not acceptting letters!!
const dataMap = new Map([["#name","amere"],["#email","aq@gmail.com"],["#phone","+972509376658"],["#company","Amere-Tech"]]);

(async () => {
  // launch the browser and the website
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://contractorsinsurancereview.com/ExampleForm/')
  // type the values in the input fields
  for(const [key,value] of dataMap){
    await page.type(key,value);
  }
  await page.select("#employees","51-500")
  // make a screenshot and save it then close the browser 
  await page.screenshot({ path: 'img1.png', fullPage: 'true' });
  await page.click('button.primary.button')// click the submission button
  await page.screenshot({ path: 'img2.png', fullPage: 'true' });
  
  const tuPage = await page.$x("//h1[contains(text(), 'Thank You')]");
  
  // check if there is a thank you text in the page
  if(tuPage.length > 0)
    console.log("Thank you");
  else
    throw new Error("ERROR!!");

  await browser.close();
})()