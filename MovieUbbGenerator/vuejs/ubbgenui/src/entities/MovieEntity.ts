export interface MovieEntity {
    title: string
    year: string
    rated: string
    released: Released
    runtime: string
    genre: string[]
    director: string
    writer: string
    actors: string[]
    plot: string
    language: string
    country: string
    awards: string
    poster: string
    ratings: Rating[]
    metascore: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    type: string
    dvd: string
    boxoffice: string
    production: string
    website: string
}

export interface Released {
    date: string
    timezone_type: number
    timezone: string
}

export interface Rating {
    source: string
    value: string
}
