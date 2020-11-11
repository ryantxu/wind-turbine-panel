import { FieldOverrideContext, FieldType, getFieldDisplayName, PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return (
    builder
      // .addTextInput({
      //   path: 'text',
      //   name: 'Simple text option',
      //   description: 'Description of panel option',
      //   defaultValue: 'Default value of text input option',
      // })
      .addSelect({
        path: 'rpmField',
        name: 'RPM Field',
        settings: {
          options: [],
          getOptions: getFieldNamesPicker,
        },
      })
  );
  // .addSelect({
  //   path: 'color',
  //   name: 'Color field',
  //   settings: {
  //     options: [],
  //     getOptions: getFieldNamesPicker,
  //   },
  //});
});

function getFieldNamesPicker(ctx: FieldOverrideContext) {
  const names: string[] = [];
  for (const frame of ctx.data) {
    for (const field of frame.fields) {
      if (field.type === FieldType.number) {
        names.push(getFieldDisplayName(field, frame, ctx.data));
      }
    }
  }
  return Promise.resolve(names.map(v => ({ label: v, value: v })));
}
