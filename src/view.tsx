import { ItemView } from 'obsidian';
import { render } from 'solid-js/web';

export class SolidJsView extends ItemView {
	static VIEW_TYPE = 'solid';
	dispose: (() => void) | null = null;

	getViewType() {
		return SolidJsView.VIEW_TYPE;
	}

	getDisplayText() {
		return 'SolidJS view';
	}

	async onOpen() {
		this.dispose = render(() => <p>Hello, world!</p>, this.contentEl);
	}

	async onClose() {
		this.dispose?.()
		this.dispose = null;
	}
}

