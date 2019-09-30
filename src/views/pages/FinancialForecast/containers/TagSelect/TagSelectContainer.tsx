import { connect } from "react-redux";
import TagSelect from "./TagSelect";
import { createTag } from "redux/ducks/financial-forecast/actions";


export default connect((state: any) => {
  const { financialForecast: { tags } } = state;

  return {
    tags
  };
}, {
  createTag
})(TagSelect);