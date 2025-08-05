const path = require('path');
import fs from 'fs';
const { expect } = require('@playwright/test');
const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

class IdeaPage {
  constructor(page) {
    this.page = page;
  }

  async login() {
    await this.page.goto('https://test123.acceptmission.com/login');
    await this.page.locator("//input[@id='user_email']").type('muhammad.sqa103@gmail.com');
    await this.page.locator("//input[@id='user_password']").type('Testing@123!');
    await this.page.locator("//input[@name='commit']").click();
    await expect(this.page).toHaveURL('https://test123.acceptmission.com/admin-studio');
  }

  async navigateToMission() {
    await this.page.locator("//a[@href='/home']//div[@class='card-content']").click();
    await expect(this.page).toHaveURL('https://test123.acceptmission.com/home');
    await expect(this.page.locator("//h1[normalize-space()='NEW ACCEPT MISSION FOR TESTING']")).toBeVisible();
    await expect(this.page.locator("//h3[normalize-space()='NEW ACCEPT MISSION']")).toBeVisible();
    await expect(this.page.locator("//img[@class='responsive-img rounded-full h-12 w-12']")).toBeVisible();
  }

  async submitIdea() {
    await this.page.locator("//span[normalize-space()='Introduction']").click();
    await expect(this.page.locator("//div[@id='viewmissiondec']")).toBeVisible();
    await this.page.locator("//a[normalize-space()='Submit Idea']").click();
    await expect(this.page.locator("//img[@class='h-10 w-auto']")).toBeVisible();
    await expect(this.page.locator("//a[@id='defaultOpen']")).toBeVisible();
    await this.page.reload();
  }

  async uploadImage() {
    await this.page.locator("//div[contains(@class, 'group-hover/image:opacity-100')]").click();
    await expect(this.page.locator("//h2[contains(@id, 'radix')]")).toBeVisible();
    const input = this.page.locator("//input[@type='file' and contains(@class, 'file_input')]");
    const filePath = path.resolve(__dirname, '../tests/files/STAMP.jpeg');
    await input.setInputFiles(filePath);
    await this.page.locator("//button[normalize-space()='Save selection']").click();
  }

  async fillDescription() {
    await this.page.locator("//div[@class='input-field description-field']//div[@role='button'][normalize-space()='p']").click();
    await this.page.locator("//div[@class='input-field description-field']//div[@class='tox-edit-area']").click();
    await this.page.locator("//div[@class='input-field description-field']//div[@class='tox-edit-area']")
      .type('Descriptive text for creating ideas');
  }

  async fillIdeaDetails() {
    await this.page.locator("//div[@class='flex items-center text-sm font-medium border border-gray-300 rounded-lg ltr:md:ml-auto rtl:md:mr-auto max-lg:order-1']//span[contains(text(),'SUBMIT IDEA')]").click();
    const randomId = Math.floor(Math.random() * 1000000);
    const ideaTitle = `New Idea for test automation ${randomId}`;
    await this.page.locator("//textarea[@id='idea-title-field']").type(ideaTitle, { timeout: 2000 });


    await this.page.locator("//button[normalize-space()='Select Department']").click();
    await this.page.locator("//div[contains(text(),'Quality Assurance')]").click();

    await this.page.locator("//div[@class='flex items-center justify-between w-full mx-auto']").click();
    await this.page.locator("//span[normalize-space()='New Category']").click();
    return ideaTitle
  }

  async addComment() {
    await this.page.locator("//a[@id='comment_tablink']").click();
    await expect(this.page.locator("//h2[normalize-space()='Comments']")).toBeVisible();
    await this.page.locator("//textarea[@placeholder='Write your comment...']").type('HERE IS NEW COMMENT', { timeout: 2000 });
    await this.page.locator("//span[contains(@class,'flex flex-shrink-0 items-center svg-icon px-3')]").click({ timeout: 2000 });
    await this.page.locator("//img[@alt='innocent']").click();
    await this.page.locator("//button[normalize-space()='Submit']").click();
  }

  async addFile() {
const isLinkSectionVisible = await this.page.locator("//h3[normalize-space()='Add Link']").isVisible();

if (!isLinkSectionVisible) {
  await this.page.getByRole('button', { name: 'Link / Files' }).click();
}
// Now proceed as normal
  await this.page.locator("//a[@id='addfiles_tablink']").click();
  await expect(this.page.locator("//h3[normalize-space()='Add Link']")).toBeVisible();
  await this.page.locator("//input[@id='attachment_name_idea_attachment']").type('This is a file');
  await this.page.locator("//input[@id='attachment_link_idea_attachment']").type("https://test123.acceptmission.com/studio/ideas/2/kanban");
  await this.page.locator("//button[normalize-space()='Add Link']").click();

  }

  async finalSubmit() {
    await this.page.locator("//div[@class='flex items-center text-sm font-medium border border-gray-300 rounded-lg ltr:md:ml-auto rtl:md:mr-auto max-lg:order-1']//span[contains(text(),'SUBMIT IDEA')]").click();
    const closeIcon = this.page.locator("//span[@class='flex items-center rtl:-scale-x-100 text-2xl ']//*[name()='svg']");
    await closeIcon.click();
  }

async verifyIdeaCreated() {
  await this.page.locator("//span[normalize-space()='My Ideas']").click();
}

async openIdea(title) {
  const ideaLocator = this.page.locator(`//ul[@class='grid gap-4 md:grid-cols-2 lg:grid-cols-4']//h3[@class='card-title text-gray-700 font-medium min-h-11' and normalize-space()='${title}']`);
  await expect(ideaLocator).toBeVisible();
  await ideaLocator.click();
  await this.page.locator("//a[normalize-space()='Advanced edit']").click();
}

//  async updateIdea() {
//  await this.page.getByRole('button', { name: 'Team' }).fi.click();
//  await this.page.getByRole('button', { name: 'Add Team Member' }).click();
//  await this.page.getByText('Select', { exact: true }).click();
//  await this.page.getByText('QA Testing', { exact: true }).click();
//  await this.page.getByRole('button', { name: 'Select innovation roles' }).click();
//  await this.page.getByLabel('Suggestions').getByText('Idea Owner').click();
//  await this.page.getByRole('button', { name: 'Add', exact: true }).click();
//  await this.page.locator("//span[normalize-space()='Idea']").click();
// }
  async fillDetailsSection() {
    await this.page.locator("//span[normalize-space()='Details']").click();

    // Funnel
    await expect(this.page.locator("//label[normalize-space()='Funnel']")).toBeVisible();
    await expect(this.page.locator("(//button[@role='combobox'])[1]")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[1]").click();
    await this.page.locator("//div[contains(text(),'QA Testing (Bugs)')]").click();

    // Lane
    await this.page.locator("(//button[@role='combobox'])[2]").click();
    await this.page.locator("//div[contains(text(),'1. Improvements/Suggestions')]").click();
    // await this.page.locator("//button[@id='create-idea-admin']").click();

    //Mission
    await this.page.locator("//span[normalize-space()='Details']").click();
    await expect(this.page.locator("(//button[@role='combobox'])[3]")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[3]").click();
    await this.page.locator("//div[contains(text(),'A NEW COMPAIGN FOR TESTING')]").click();
    

    //Idea Date
    await expect(this.page.locator("//label[normalize-space()='Idea deadline']")).toBeVisible();
    await this.page.locator("//span[normalize-space()='Pick a date']").click();
    await this.page.locator("//button[normalize-space()='Today']").click();

    // Department
    await expect(this.page.locator("//label[normalize-space()='Department']")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[4]").click();
    await this.page.locator("//div[contains(text(),'Quality Assurance')]").click();
    
    //Catagory
    await expect(this.page.locator("//label[normalize-space()='Categories']")).toBeVisible();
    await this.page.locator("//div[@class='inline-flex items-center rounded-full border px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 border-gray-500 text-foreground hover:bg-white']//*[name()='svg']")
    .click();
    await this.page.locator("//span[normalize-space()='Select categories']").click();
    await this.page.locator("//span[normalize-space()='New Category']").click();

   //Idea Type
    await expect(this.page.locator("//label[normalize-space()='Idea type']")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[5]").click();
    await this.page.locator("//div[contains(text(),'Ideas')]").click();
    

    //Innovation Type
    await expect(this.page.locator("//label[normalize-space()='Innovation type']")).toBeVisible();
    await this.page.locator("(//button[@aria-controls='radix-«ra»'])[1]").click();
    await this.page.locator("//div[normalize-space()='PRODUCT INNOVATION']").click();
    

    // Status
    await expect(this.page.locator("//label[normalize-space()='Status']")).toBeVisible();
    await this.page.locator("//button[@aria-controls='radix-«rb»']").click();
    await this.page.locator("//div[contains(text(),'Submitted')]").click();

  //Status Reason
const selectReasonsBtn = this.page.getByRole('button', { name: 'Select Reasons' });
await selectReasonsBtn.waitFor({ state: 'visible' });
await selectReasonsBtn.click();

await this.page.locator("//span[normalize-space()='Good business case']").click();
    

    // Owner
    await expect(this.page.locator("//label[normalize-space()='Owner']")).toBeVisible();
    await this.page.locator("(//button[@aria-controls='radix-«rd»'])[1]").click();
    await this.page.getByText("Muhammad SQA").click();
    

  //   //Creator 
  //   await expect(this.page.locator("//label[normalize-space()='Creator']")).toBeVisible();
  //   await this.page.locator("//button[@aria-controls='radix-«re»']").click();
  //  // await this.page.getByText("Muhammad A").nth(1).click();

  //   // Save Idea
  //   await this.page.locator("//button[@id='create-idea-admin']").click();

}
   async AddComment(){
    
  await this.page.getByRole('button', { name: 'Comments' }).click();
  await this.page.getByPlaceholder('Write your comment...').click();
  await this.page.getByPlaceholder('Write your comment...').fill('This is a Test Comment');
  await this.page.getByRole('button', { name: 'Emoji' }).click();
  await this.page.getByLabel('slightly smiling face').click();
  await this.page.getByRole('button', { name: 'Submit' }).click();

  }
 
  async openTaskModal() {
  await this.page.getByRole('button', { name: 'Tasks' }).click();
  await this.page.locator('#add-task-btn').click();
}

async fillTaskForm() {
  const randomTitle = `Task ${Math.floor(Math.random() * 10000)}`;
  const randomPhase = `Phase ${Math.ceil(Math.random() * 5)}`;
  const randomPriority = Math.ceil(Math.random() * 5); // Assuming priorities are 1 to 5


  await this.page.getByLabel('Title').click();
  await this.page.getByLabel('Title').fill(randomTitle);

  await this.page.getByLabel('Phase').click();
  await this.page.getByLabel('Phase').fill(randomPhase);
  await this.page.locator('div.field:has(label:text("Start date")) button').click();
  await this.page.getByRole('gridcell').nth(Math.floor(Math.random() * 28)).click(); // random day 1-28

  // Random end date (Next month random day)
  await this.page.locator('div.field:has(label:text("Due date")) button').click();
  await this.page.getByLabel('Go to next month').nth(1).click();
  await this.page.getByRole('gridcell').nth(Math.floor(Math.random() * 28)).click();

  await this.page.locator('label:text("Status")').locator('..').locator('button').click();
  await this.page.getByLabel('Suggestions').getByText('Not started').click();
  await this.page.locator('button').filter({ hasText: /^0$/ }).first().click();
  await this.page.getByRole('option', { name: `${randomPriority}`, exact: true }).click();
  await this.page.getByRole('button', { name: 'Save' }).click();
  console.log(`Created task: ${randomTitle} | ${randomPhase} | Priority: ${randomPriority}`);
  return randomTitle
}

async AddTask() {
  await this.openTaskModal();
  await this.fillTaskForm();
}
}
module.exports = { IdeaPage };