// import { expect, test } from '@playwright/test';
// import fs from 'fs';
// import path from 'path';
// import { LoginPage } from '../pages/LoginPage';
// import { SignUpPage } from '../pages/SignUpPage';
// import { VerifyEmailPage } from '../pages/verifyEmailPage';
// const dataFilePath = path.resolve(__dirname, '../data/data.json');
// const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

// function createMailinatorEmail(prefix = 'acceptqatest') {
//     const uniqueId = Math.floor(Math.random() * 90 + 10); 
//     return `${prefix}+automationtest${uniqueId}@mailinator.com`;
// }

// // test('User can sign up through email', async ({ browser }) => {
// //     const context = await browser.newContext();
// //     const page = await context.newPage();
// //     const signUpPage = new SignUpPage(page);
// //     const email = createMailinatorEmail(); 
// //     const password = data.login.password;
// //     const emailPrefix = email.split('@')[0];
// //     await page.goto(data.signup.url);
// //     await expect(page).toHaveURL(data.signup.url);
// //     await signUpPage.signUp(email, password);
// //     const page1 = await context.newPage();
// //     const verifyEmailPage = new VerifyEmailPage(page1);
// //     const loginTab = await verifyEmailPage.loginAndVerifyConfirmationEmail(emailPrefix);
// //     console.log('Login tab URL:', loginTab);
// //     const loginPage = new LoginPage(loginTab);
// //     await loginPage.login(email, password);
// //     await page.waitForTimeout(2000)
// //     const currentUrl = loginTab.url();
// //     if (currentUrl.includes('/wizard/step1'))
// //     {
// //         await expect(loginTab.locator(loginPage.companyExperienceTextLocator)).toBeVisible();
// //         await loginPage.clickNext();
// //         await expect(loginTab.locator(loginPage.ideaManagementLocator)).toBeVisible();
// //         await expect(loginTab.locator(loginPage.funnelManagementLocator)).toBeVisible();
// //         await loginPage.clickNext();
// //         await expect(loginTab.locator(loginPage.imgLocator)).toBeVisible();
// //         await loginTab.locator(loginPage.finishButton).click();
// //         await loginTab.locator(loginPage.startButton).click();
// //         await expect(loginTab.locator(loginPage.userProfile)).toBeVisible();
// //     }
// //     else {
// //         expect(currentUrl).toContain('/admin-studio');
// //     }
// //     await context.close();
// // });

// // test('User can Log In through email', async ({ browser }) => {
// //     const context = await browser.newContext();
// //     const page = await context.newPage();

// //     const loginPage = new LoginPage(page);
// //     await page.goto(data.login.url)
// //     await loginPage.login(data.login.email, data.login.password);
// //     await page.waitForTimeout(2000)
// //     const currentUrl = page.url();
// //     if (currentUrl.includes('/wizard/step1'))
// //     {
// //         await expect(page.locator(loginPage.companyExperienceTextLocator)).toBeVisible();
// //         await loginPage.clickNext();
// //         await expect(page.locator(loginPage.ideaManagementLocator)).toBeVisible();
// //         await expect(page.locator(loginPage.funnelManagementLocator)).toBeVisible();
// //         await loginPage.clickNext();
// //         await expect(page.locator(loginPage.imgLocator)).toBeVisible();
// //         await page.locator(loginPage.finishButton).click();
// //         await page.locator(loginPage.startButton).click();
// //         await expect(page.locator(loginPage.userProfile)).toBeVisible();
// //     }
// //     else {
// //         expect(currentUrl).toContain('/admin-studio');
// //         await page.goto(data.Idea.IdeaUrl)
// //     }
// //     await context.close();
// // });

// // test('User can reset password', async ({ browser }) => {
// //     const context = await browser.newContext();
// //     const page = await context.newPage();
// //     const newPassword = createPassword();

// //     // Step 1: Reset password
// //     const loginPage = new LoginPage(page);
// //     await page.goto(data.resetPassword.url);
// //     await loginPage.resetPassword(data.resetPassword.email);

// //     // Step 2: Verify email and reset password using Mailinator
// //     const page1 = await context.newPage();
// //     const verifyEmailPage = new VerifyEmailPage(page1);
// //     const emailPrefix = data.resetPassword.email.split('@')[0];
// //     const resetPasswordTab = await verifyEmailPage.loginIntoEmailToResetPassword(emailPrefix);

// //     const loginPage1 = new LoginPage(resetPasswordTab);
// //     await loginPage1.createNewPassword(newPassword);

// //     // Step 3: Close the current context and create a new one for a clean session
// //     await context.close();
// //     const newContext = await browser.newContext();
// //     const newPage = await newContext.newPage();

// //     // Step 4: Log in with the new password
// //     const loginPage2 = new LoginPage(newPage);
// //     await newPage.goto(data.resetPassword.url);
// //     await loginPage2.login(data.resetPassword.email, newPassword);

// //     // Step 5: Verify login flow
// //     const currentUrl = newPage.url();
// //     if (currentUrl.includes('/wizard/step1'))
// //     {
// //         await expect(newPage.locator(loginPage2.companyExperienceTextLocator)).toBeVisible();
// //         await loginPage2.clickNext();
// //         await expect(newPage.locator(loginPage2.ideaManagementLocator)).toBeVisible();
// //         await expect(newPage.locator(loginPage2.funnelManagementLocator)).toBeVisible();
// //         await loginPage2.clickNext();
// //         await expect(newPage.locator(loginPage2.imgLocator)).toBeVisible();
// //         await newPage.locator(loginPage2.finishButton).click();
// //         await newPage.locator(loginPage2.startButton).click();
// //         await expect(newPage.locator(loginPage2.userProfile)).toBeVisible();
// //     }
// //     await newContext.close();
// // });