import { Pageable } from './pageable.model';
import { Sort } from './sort.model';

export class Page {
    content: any[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    sort: Sort;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}