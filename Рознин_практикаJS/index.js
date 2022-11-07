const searchInput = document.querySelector(".top-input");
const bookContainer = document.querySelector(".block-content");


const listenForFavourite = () => {
	const favoriteButtons = bookContainer.querySelectorAll(".button-love");
	favoriteButtons.forEach(btn => {
		btn.onclick = null;
		btn.onclick = (e) => {
			const avatar = btn.getAttribute("src");
			if (avatar.includes("empty-fav")) {
				btn.setAttribute("src", "icon/fav.png");
				sortBookItems(document.querySelectorAll(".block-item"));
			}

			if (avatar == "icon/fav.png") {
				btn.setAttribute("src", "icon/empty-fav.png");
				sortBookItems(document.querySelectorAll(".block-item"));
			}
		}
	})
}


const listenRemoveButtons = () => {
	const deleteButtons = bookContainer.querySelectorAll(".block-item-delete");
	deleteButtons.forEach(btn => {
		btn.onclick = null;
		btn.onclick = (e) => {
			const deleteItem = btn.closest(".block-item");
			deleteItem.onclick = null;
			deleteItem.remove();
			listenRemoveButtons();
			sortBookItems(document.querySelectorAll(".block-item"));
		}
	})
};

listenForFavourite();
listenRemoveButtons();



const sortBookItems = items => {
	const hiddenItems = [...items].filter(item => window.getComputedStyle(item).display === "none");

	const visibleItems = [...items].filter(item => window.getComputedStyle(item).display === "flex");

	const favoriteItems = visibleItems.filter(item => {
		const heart = item.querySelector(".button-love");
		return heart.getAttribute("src") === "icon/fav.png";
	})

	const commonItems = visibleItems.filter(item => {
		const heart = item.querySelector(".button-love");
		return heart.getAttribute("src") === "icon/empty-fav.png";
	});

	const sortedItems = [
		...favoriteItems,
		...commonItems.sort((a, b) => {
			const first = a.querySelector(".book__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
			const second = b.querySelector(".book__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
			if (first.attr < second.attr)
				return -1;
			if (first.attr > second.attr)
				return 1;
			return 0;
		}),
		...hiddenItems
	];
	bookContainer.replaceChildren(...sortedItems);
}
sortBookItems(document.querySelectorAll(".book__item"));


searchInput.addEventListener("input", (e) => {
	const searchValue = e.target.value;
	const items = document.querySelectorAll(".book__item");
	items.forEach(item => {
		const name = item.querySelector(".book__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
		if (!name.toLowerCase().includes(searchValue.toLowerCase())) {
			item.style.display = "none";
		}
		else {
			item.style.display = "flex";
		}
	});
	sortBookItems(items);
})