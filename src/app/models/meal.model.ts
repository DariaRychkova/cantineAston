import { ElementStandard } from './element.model';

export class Meal extends ElementStandard {
  constructor(
    public id: number,
    public label: string,
    public status: number,
    public imageId: number,
    public priceDF: number,
    public availableForWeeks: [],
    public category: number,
    public ingredients: ElementStandard[]
  ) {
    super(id, label, status, imageId);
  }
}
