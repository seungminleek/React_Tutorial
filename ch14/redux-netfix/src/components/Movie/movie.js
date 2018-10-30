const React = require('react'),
      {connect} = require('react-redux'),
      {Link} = require('react-router'),
      {fetchMovieActionCreator} = require('modules/movies.js'),
      styles = require('./movie.css');

class Movie extends React.Component {
    componentWillMount() {
        this.props.fetchMovie(this.props.param.id);
    }

    componentWillUpdate(next) {
        if (this.props.params.id !== next.params.id)
            this.props.fetchMovie(next.params.id);
    }

    render() {
        const {movie={starring:[]}} = this.props;

        return(
            <div className={styles.movie} style={{backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.625) 100%), url(${movie.cover})'}}>
                <div className={styles.cover} style={{backgroundImage: 'url(${movie.cover})'}} />
                <div className={styles.description}>
                    <div className={styles.title}>{movie.title}</div>
                    <div className={styles.year}>{movie.year}</div>
                    <div className={styles.starring}>
                        {movie.starring.map((actor = {}, index) => (
                            <div key={index} className={styles.actor}>
                                {actor.name}
                            </div>
                        ))}
                    </div>
                </div>
                <Link className={styles.closeButton} to="/movies">
                    <-
                </Link>
            </div>
        );
    }
}

module.exports = connect(state => ({
        movie: state.movie.current
    }), {fetchMovie: fetchMovieActionCreator})(Movie);