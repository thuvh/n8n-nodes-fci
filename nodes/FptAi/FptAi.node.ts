import type {
	INodeType,
	INodeTypeDescription
} from 'n8n-workflow';
// import { NodeConnectionType } from 'n8n-workflow';

import { chatFields, chatOperations } from './ChatDescription';
import { imageFields, imageOperations } from './ImageDescription';
import { textFields, textOperations } from './TextDescription';

export class FptAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FptAi',
		name: 'fptAi',
		icon: { light: 'file:openAi.svg', dark: 'file:openAi.dark.svg' },
		group: ['transform'],
		version: 1,
		// subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume FPT Market Place',
		defaults: {
			name: 'FptAI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'fptAiApi',
				required: true,
			},
		],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
			baseURL:
				'={{ $credentials.url?.split("/").slice(0,-1).join("/") ?? "https://mkp-api.fptcloud.com" }}',
		},
		properties: [

			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Text',
						value: 'text',
					},
				],
				default: 'text',
			},

			...chatOperations,
			...chatFields,

			...imageOperations,
			...imageFields,

			...textOperations,
			...textFields,
		],
	};
}
