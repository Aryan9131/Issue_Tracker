// Get all elements with the class 'card-li'
const allIssues = Array.from(document.getElementsByClassName('card-li'));

// Add event listener to the 'apply-filter-btn'
document.getElementById('apply-filter-btn').addEventListener('click', function(e){
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxesArray = Array.from(checkboxes); // Convert NodeList to Array

    // Filter and map to get an array of values for the checked checkboxes
    const checkedCheckboxes = checkboxesArray
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Get the container where the filtered issues will be displayed
    let issueListContainer = document.getElementById('issue-list-container');

    // Variable to store the HTML of the new filtered issue list items
    let newIssueListContainerItems = ``;

    // Check if any checkboxes are checked
    if (checkedCheckboxes.length === 0) {
        // If no checkboxes are checked, display all issues
        for (let issueItem of allIssues) {
            newIssueListContainerItems += issueItem.innerHTML + `<br>`;
        }
    } else {
        // If checkboxes are checked, filter issues based on checkbox values
        for (let issueItem of allIssues) {
            // Get the title element within the issue item
            const issueTitle = issueItem.querySelector('.card-body .card-title');

            // Check if the innerText of the title is in the checkedCheckboxes array
            if (checkedCheckboxes.indexOf(issueTitle.innerText) !== -1) {
                // If yes, add the issue item HTML to the new list
                newIssueListContainerItems += issueItem.innerHTML + `<br>`;
            }
        }
    }

    // Update the issue list container with the new HTML
    issueListContainer.innerHTML = newIssueListContainerItems;
});
