import re
import time
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Generate unique credentials
    unique_id = int(time.time())
    email = f"user_{unique_id}@example.com"
    password = "password123"

    # Go to auth page
    page.goto("http://localhost:3000/auth")

    # --- Sign Up ---
    # Click Sign Up tab
    page.get_by_role("button", name="Sign Up").click()

    # Fill in sign up form
    page.get_by_placeholder("Email").fill(email)
    page.get_by_placeholder("Password").fill(password)
    page.get_by_placeholder("Confirm Password").fill(password)

    # Submit the form
    page.locator("form").get_by_role("button", name="Sign Up").click()

    # Wait for dashboard and take screenshot
    expect(page).to_have_url(re.compile(r".*dashboard"), timeout=15000)
    page.wait_for_selector("text=Hello, there", timeout=10000)
    page.screenshot(path="jules-scratch/verification/dashboard_verification.png")

    # Navigate to financials page and take screenshot
    page.get_by_role("link", name="Financials").click()
    expect(page).to_have_url(re.compile(r".*financials"))
    page.wait_for_selector("text=Categories", timeout=10000)
    page.screenshot(path="jules-scratch/verification/financials_verification.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)