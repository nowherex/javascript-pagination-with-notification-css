let list_items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10"
];

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 10;

function deleteFirt() {
    list_items.shift()
    clearTimeout(window.timeout);
    alertify.error('First item Deleted!', 0)
    window.timeout = setTimeout(function() {
        alertify.dismissAll();
    }, 2000);
    DisplayList(list_items, list_element, rows, current_page);
    SetupPagination(list_items, pagination_element, rows)

}

function insert() {
    let item = `Item ${list_items.length + 1}`
    list_items.unshift(item)
    clearTimeout(window.timeout);
    alertify.success('Successfully inserted', 0)
    window.timeout = setTimeout(function() {
        alertify.dismissAll();
    }, 2000);
    DisplayList(list_items, list_element, rows, current_page);
    SetupPagination(list_items, pagination_element, rows)

}

function DisplayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        let item_element = document.createElement('div');
        let id = list_items.indexOf(item)
        item_element.classList.add('item');
        item_element.innerHTML += `<span style="width: 20px; font-family: sans-serif">#${id + 1}</span>`
        item_element.innerHTML += `<div><input autocomplete="off" onfocus="this.select();" onmouseup="return false;" type="text" value="${item}" id="${id}"></div>`
        item_element.innerHTML += `
		<ul class="flex-container flex-start">
		  <li class="flex-item">
		    <div class="tooltip">
			  <button class='btn-primary' onclick="copytoClipboard(${id})")">
			  <span class="tooltiptext" id="to${id}">Copy to Clipboard</span>
			  Copy</button>
			</div>
		  </li>
		  <li class="flex-item">
			<div class="tooltip-danger">
			  <button class='btn-danger' onclick="deleteItem(${id})")">
			  <span class="tooltiptext-danger" id="to${id}">Delete</span>
			  ❌</button>
			</div>
		  </li>
		 </ul>`


        wrapper.appendChild(item_element);
    }
}

function SetupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

function PaginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page) button.classList.add('active');

    button.addEventListener('click', function() {
        current_page = page;
        DisplayList(items, list_element, rows, current_page);

        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}

function deleteItem(item) {
    if (item > -1) {
        list_items.splice(item, 1);
        clearTimeout(window.timeout);
        alertify.error('Deleted!', 0)
        window.timeout = setTimeout(function() {
            alertify.dismissAll();
        }, 2000);
        DisplayList(list_items, list_element, rows, current_page)
        SetupPagination(list_items, pagination_element, rows)
    }

}

function copytoClipboard(item) {
    var copyText = document.getElementById(item);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    var tooltip = document.getElementById(`to${item}`);
    tooltip.innerHTML = `Copied ${parseInt(item+1, 10)} item!`;
}



DisplayList(list_items, list_element, rows, current_page);
SetupPagination(list_items, pagination_element, rows);