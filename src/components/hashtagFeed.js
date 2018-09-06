import React from "react";
import { Tweet } from "react-twitter-widgets";
import { connect } from "react-redux";
import { fetchTweets } from "../actions/tweetAction";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import "./hashtagFeed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class HashtagFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVideoURL: "",
      inputComment: ""
    };
    this.handleChangeInputVideoURL = this.handleChangeInputVideoURL.bind(this);
    this.handleChangeInputComment = this.handleChangeInputComment.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchTweets());
  }

  handleChangeInputVideoURL(event) {
    this.setState({
       inputVideoURL: event.target.value
    });
  }

  handleChangeInputComment(event) {
    this.setState({
       inputComment: event.target.value
    });
  }

  render() {
    const { tweets } = this.props;
    var hrefTwi =
      "https://twitter.com/intent/tweet?button_hashtag=NowPlaying&ref_src=twsrc%5Etfw&text=" +
      this.state.inputComment + " " + this.state.inputVideoURL;
    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <Input
            value={this.state.inputVideoURL}
            placeholder="Video URL"
            onChange={this.handleChangeInputVideoURL}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            value={this.state.inputComment}
            placeholder="Comment"
            onChange={this.handleChangeInputComment}
          />
        </Grid>
        <Grid item xs={4}>
          <a className="btnz share twitter" href={hrefTwi}>
            <FontAwesomeIcon icon={["fab", "twitter"]} />
            Tweet #NowPlaying
          </a>
        </Grid>
        <Grid item xs={12}>
          <Card>
            {tweets.map((tweet, id) => (
              <Tweet key={id} tweetId={tweet.id_str} />
            ))}
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  tweets: state.tweets.items,
  loading: state.tweets.loading,
  error: state.tweets.error
});

export default connect(mapStateToProps)(HashtagFeed);
