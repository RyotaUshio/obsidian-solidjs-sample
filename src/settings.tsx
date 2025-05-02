import { PluginSettingTab } from 'obsidian';
import SolidJsPlugin from './main';
import { render } from 'solid-js/web';

export class SolidJsSettingTab extends PluginSettingTab {
	dispose: (() => void) | null = null;

	constructor(public plugin: SolidJsPlugin) {
		super(plugin.app, plugin);
	}

	display() {
		this.dispose = render(() => <p>Hello, world! </p>, this.containerEl);
	}

	hide() {
		this.dispose?.();
		this.dispose = null;
	}
}
