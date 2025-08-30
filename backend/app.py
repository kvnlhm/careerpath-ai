import os
import sys
import replicate

# This code is a temporary debugger
# It will only print the API call result to the logs.

# This is the API token from your Render environment variables.
api_token = os.getenv("REPLICATE_API_TOKEN")

if not api_token:
    print("FATAL ERROR: REPLICATE_API_TOKEN is not set!", file=sys.stderr)
    sys.exit(1)

# A sample prompt to test the API call
test_prompt = "Hello, world! Say hello."

try:
    print("Attempting to call Replicate API...", file=sys.stderr)
    
    replicate.api_token = api_token
    output = replicate.run(
        "ibm-granite/granite-3.3-8b-instruct:3ff9e6e20ff1f31263bf4f36c242bd9be1acb2025122daeefe2b06e883df0996",
        input={"prompt": test_prompt, "max_tokens": 100}
    )
    
    result_text = "".join(output)
    print("API call SUCCESSFUL. Output received:", file=sys.stderr)
    print(result_text, file=sys.stderr)

except Exception as e:
    print(f"API call FAILED. The error is: {e}", file=sys.stderr)
    sys.exit(1)

# At this point, the code will exit, but the logs will tell us the result.
# The app will not run, so you will see a crash in the logs, which is expected for this test.