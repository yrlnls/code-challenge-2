// Initialize an array to store shopping list items
let shoppingList = [];

// Get references to the input field, button, and list
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const itemList = document.getElementById('itemList');
const clearListButton = document.getElementById('clearListButton');
const clearPurchasedButton = document.getElementById('markPurchasedButton');

// Load items from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadItemsFromLocalStorage);

// Function to load items from local storage
function loadItemsFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList = items; // Initialize the shoppingList array with loaded items
    items.forEach(item => {
        addItemToList(item.text, item.purchased);
    });
}

// Function to add an item to the list
function addItemToList(text, purchased = false) {
    const li = document.createElement('li'); // Create a new list item
    li.textContent = text; // Set the text of the list item
    if (purchased) {
        li.classList.add('purchased'); // Mark as purchased if applicable
    }

    //Create a "Mark Purchased" button for esch item
    const markPurchasedButton = document.createElement('button');
    markPurchasedButton.textContent = 'Mark Purchased';
    //Event listener to mark the item as purchased
    markPurchasedButton.addEventListener('click', (e) => {
        e.stopPropagation();
        li.classList.toggle('purchased');
        const itemText = li.textContent.replace('RemoveMark Purchased', '').trim();
        shoppingList = shoppingList.map(i =>
            i.text === itemText ? { ...i, purchased: !li.classList.contains('purchased') } : i
        );
        saveItemsToLocalStorage();
    });

    // Create a "Remove" button for each item
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    // Event listener to remove the item
    removeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the list item
        itemList.removeChild(li); // Remove the list item
        shoppingList = shoppingList.filter(item => item.text !== text); // Update the shoppingList array
        saveItemsToLocalStorage(); // Save to local storage after removing
    });

    li.appendChild(markPurchasedButton);
    li.appendChild(removeButton); // Append the remove button to the list item
    itemList.appendChild(li); // Add the new item to the list

    // Add the new item to the shoppingList array
    shoppingList.push({ text, purchased });
}

// Event listener for the "Add" button
addButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim(); // Get the input value and trim whitespace
    if (itemText) { // Check if the input is not empty
        addItemToList(itemText); // Add the new item to the list
        itemInput.value = ''; // Clear the input field
        saveItemsToLocalStorage(); // Save to local storage after adding
    }
});

// Event listener for the "Clear List" button
clearListButton.addEventListener('click', () => {
    itemList.innerHTML = ''; // Clear all items from the list
    shoppingList = []; // Reset the shoppingList array
    localStorage.removeItem('shoppingList'); // Clear local storage
});

// Function to save items to local storage
function saveItemsToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); // Save the shoppingList array to local storage
}