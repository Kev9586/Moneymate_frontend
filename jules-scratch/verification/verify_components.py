from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3000/playground", wait_until="networkidle")

        heading = page.get_by_role("heading", name="Component Playground")
        expect(heading).to_be_visible(timeout=15000)

        page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
        print("Screenshot taken successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
        print("\\nPage content:\\n")
        print(page.content())
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)