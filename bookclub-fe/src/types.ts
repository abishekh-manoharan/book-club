export interface Book {
    title: string;
    author_name: string;
    first_publish_year: number;
    number_of_pages_median: number;
    ratings_average: number;
}

export interface BrowseQueryData {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: Book[];
    num_found: number;
    q: string;
    offset: null
}