'use strict';
import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {

	const collection = vscode.languages.createDiagnosticCollection('test');
	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(document => {
		if (path.extname(document.fileName) == '.kl') {
			if (vscode.window.activeTextEditor) {
				updateDiagnostics(vscode.window.activeTextEditor.document, collection);
			}
		}
	}));
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			updateDiagnostics(editor.document, collection);
		}
	}));
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
	if (path.extname(document.uri.path) == '.kl') {

		let ktrans: string;
		try {
			ktrans = cp.execSync(
				'ktrans ' + document.fileName + ' ' + path.join(os.tmpdir(), 'tullogtoys.pc')

			).toString();
		} catch (err: any) {
			ktrans = err.stdout.toString();
		}

		const pattern = /(\n\s*)(?<line>\d+)(\s+)(?<text>.*?)(\n)(.*?\n)(?<message>.*?)(\n)/s;

		if (ktrans == undefined) return;
		const m = pattern.exec(ktrans);
		if (m != null) {
			if (m.groups == undefined) return;
			const lineNum = parseInt(m.groups.line);
			collection.set(document.uri, [{
				code: m.groups.text,
				message: m.groups.message,
				range: new vscode.Range(lineNum - 1, 0, lineNum - 1, 1),
				severity: vscode.DiagnosticSeverity.Error,
				source: '',
				relatedInformation: [
					new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(1, 8), new vscode.Position(1, 9))), 'first assignment to `x`')
				]
			}]);
		} else {

			collection.clear();
		}

	} else {
		collection.clear();
	}
}
