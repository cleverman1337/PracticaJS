const addModal = document.querySelector(".add-modal");
const openModalButton = document.querySelector(".footer-btn");
const createButton = document.querySelector(".create-button");
const phoneInput = document.getElementById("add-phone");

const maskPhoneInput = () =>
{
	
	const maskOptions = {
		mask: '{8} (000) 000-00-00',
		lazy: false,
	};

	IMask(phoneInput, maskOptions);
}

const insertBookItemIntoBookContainer = (name, phoneNumber, isFavorite) => {
	const bookItem = `
	<div class="block-item">
		<div class="block-item-logo">
			<img src="icon/person.png" alt="">
		</div>
		<div class="block-item-data">
			<div class="block-item-name">
				${name}
			</div>
			<div class="block-item-phone">
				${phoneNumber}
			</div>
		</div>

		<div class="block-item-buttons">
			<button class="block-item-delete">
				<img class="button-img" src="icon/delete.png" alt="">
			</button>
			<button class="block-item-favourite">
				<img class="button-love" src="${isFavorite ? "icon/fav.png" : "icon/empty-fav.png"}" alt="empty">
			</button>
		</div>
</div>`;

	bookContainer.insertAdjacentHTML("beforeend", bookItem);
}

openModalButton.addEventListener("click", () => {
	addModal.style.display = "flex";
	document.body.classList.add("modal-open");
	maskPhoneInput();
})

createButton.addEventListener("click", () => {
	const nameInput = document.getElementById("add-name");
	const phoneInput = document.getElementById("add-phone");
	const checkbox = document.getElementById("is-favorite");

	const handledPhoneNumber = phoneInput.value.replace(/\(|\)|\s|\_|\-/g, "");
	if (/(?:\+|\d)[\d\-\(\) ]{9,}\d/g.test(handledPhoneNumber) && nameInput.value !== "" && handledPhoneNumber.length === 11) {
		insertBookItemIntoBookContainer(nameInput.value, phoneInput.value, checkbox.checked);
		document.body.classList.remove("modal-open");
		addModal.style.display = "none";
		checkbox.checked = false;
		nameInput.value = "";
		maskPhoneInput()
		listenRemoveButtons();
		listenForFavourite();
		sortBookItems(document.querySelectorAll(".block-item"));
	}
});

