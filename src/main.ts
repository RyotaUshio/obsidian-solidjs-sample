import { Plugin } from 'obsidian';
import { SolidJsSettingTab } from './settings';
import { SolidJsView } from './view';

export default class SolidJsPlugin extends Plugin {
	onload() {
		this.addSettingTab(new SolidJsSettingTab(this));
		this.registerView(SolidJsView.VIEW_TYPE, leaf => new SolidJsView(leaf));
	}

	onUserEnable() {
		this.app.workspace.ensureSideLeaf(SolidJsView.VIEW_TYPE, 'right', {
			reveal: false
		});
	}
}

