import { AutoFixHighSharp, LineAxisOutlined } from "@mui/icons-material";
import { getQuestion } from "../..//api/question";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import BasicButton from "../BasicButton";
import WestIcon from "@mui/icons-material/West";
import { useNavigate } from "react-router";
export default function QuestionsDetail() {
  const Token = useSelector((state) => state.UserInfo.accessToken);
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [questionId, setQuestionId] = useState(1);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionExp, setQuestionExp] = useState("");
  const [answerRes, setAnswerRes] = useState([[], 0]);
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const clickQuestionList = () => {
    //redux에 세팅 or props
    navigate("/questionslist");
  };
  const handleClick = (idx) => {
    const newArr = Array(answerList.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    console.log(newArr);

    console.log("answerRes", answerRes[1], questionExp);

    if (answerRes[1] !== idx) {
      Swal.fire({
        icon: "error",
        title: "틀렸습니다.",
        text: questionExp,
      });
    } else if (answerRes[1] === idx) {
      Swal.fire({
        icon: "success",
        title: "맞았습니다.",
        text: questionExp,
      });
    }
    // 사용자 로그 찍는거
  };
  useEffect(() => {
    const questionId = 1;
    getQuestion(
      questionId,
      Token,
      (res) => {
        console.log(res.data);
        setQuestionTitle(res.data.questionTitle);
        setQuestionExp(res.data.questionExp);
        setAnswerRes([
          res.data.answerRes.answers,
          res.data.answerRes.rightAnswer,
        ]);
        console.log(res.data.answerRes);
        console.log(answerRes[0]);
        setAnswerList(res.data.answerRes.answers);
      },
      (err) => {
        console.log(err);
      }
    );

    // getProfile();
  }, []);

  return (
    <div style={{ display: "flex", margin: "5vh" }}>
      {" "}
      {answerRes[0] != null && answerRes[0].length > 0 ? (
        <div>
          {" "}
          <Box sx={{ width: "100%", display: "block" }}>
            <Button
              size="large"
              variant="contained"
              style={{
                backgroundColor: "#64b5f6",
                float: "left",
              }}
              onClick={clickQuestionList}
            >
              <WestIcon size="large"></WestIcon>
            </Button>
            <br />
            <br></br>
            <h1 style={{ wordBreak: "break-all", width: "100%" }}>
              Q. {questionTitle}
            </h1>
            <Grid style={{ textAlign: "center" }} container rowSpacing={1}>
              {/* <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        1번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0][0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        2번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0][0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        3번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0][0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        4번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0][0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid> */}

              {answerList.map((elm, index) => {
                return (
                  <BasicButton
                    key={index}
                    isSelected={isCategorySelect[index]}
                    handleClick={handleClick}
                    elementIndex={index}
                    content={elm}
                  />
                );
              })}
            </Grid>
          </Box>
        </div>
      ) : null}
    </div>
  );
}