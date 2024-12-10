import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  IBlogDetails,
  IBlogDetailsResponse,
} from "@/interfaces/api.all.interface";
import assest from "@/json/assest";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { mediaURL } from "@/redux/helper/helper";
import { getSingleBlog } from "@/redux/slice/blogSlice";
import { createComment } from "@/redux/slice/commentSlice";
import { commentSchema } from "@/schema/userShema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Stack,
  styled,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const DetailsBlock = styled(Box)`
  padding: 100px 0;
  figure {
    width: 100%;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Index = () => {
  const cookies = parseCookies();
  const userId = cookies["user_id"];
  const [userData, setUserData] = useState<IBlogDetails | null>(null);
  const router = useRouter();
  const { blogLoading } = useAppSelector((s) => s.blog);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver<{ comment: string }>(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    if (router.query.id) {
      dispatch(getSingleBlog(router.query.id as string))
        .unwrap()
        .then((data) => {
          if (data?.status === 200) {
            setUserData(data?.blog);
          }
        });
    }
  }, [router.query.id]);

  const commentSubmit = (data: { comment: string }) => {
    const payload = {
      authorId: userId,
      blogId: router.query.id as string,
      comment: data?.comment,
    };
    dispatch(createComment(payload))
      .unwrap()
      .then((data) => {
        if (data?.status === 201) {
          dispatch(getSingleBlog(router.query.id as string));
          reset();
        }
      });
  };

  return (
    <Wrapper>
      <Container fixed>
        {blogLoading ? (
          <Typography variant="h3">Loading...</Typography>
        ) : (
          <>
            {!!userData && userData && (
              <DetailsBlock>
                <Typography variant="h2">{userData?.title}</Typography>
                <figure>
                  <Image
                    src={
                      userData?.image
                        ? `${mediaURL}/${userData?.image}`
                        : assest?.no_img
                    }
                    alt="no image"
                    width={300}
                    height={300}
                  />
                </figure>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={4}
                >
                  <Typography>Author: {userData?.userId?.fullName}</Typography>

                  <Typography>
                    Published in:{" "}
                    {moment(userData?.createdAt).format("DD:MM:YYYY")}
                  </Typography>
                </Stack>

                <Box mt={4}>
                  <Typography variant="h4">Description:</Typography>
                  <Typography>{userData?.description}</Typography>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleSubmit(commentSubmit)}
                  mt={4}
                >
                  <Controller
                    control={control}
                    name="comment"
                    render={({
                      field: { ...props },
                      fieldState: { invalid, error },
                    }) => (
                      <TextField
                        fullWidth
                        {...props}
                        helperText={error?.message}
                        error={invalid}
                        placeholder="Wriate Comment"
                        multiline
                        rows={4}
                      />
                    )}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      marginTop: "15px",
                    }}
                    type="submit"
                  >
                    Submit Comment
                  </Button>
                </Box>
                <Box mt={4}>
                  <Typography variant="h4">Comments:</Typography>
                  <List>
                    {
                      !!userData?.comments && userData?.comments?.length && userData?.comments?.map((comment)=>(
                        <ListItem key={comment?._id} sx={{
                          backgroundColor:(theme:Theme) => theme.palette.action.disabled,
                          display:"block",
                          width:"100%",
                          marginBottom:"10px"
                        }}>
                          <Typography variant="h6">Author: {comment?.authorId?.fullName}</Typography>
                          <Typography>comment: {comment?.comment}</Typography>
                        </ListItem>
                      ))
                    }
                  </List>
                </Box>
              </DetailsBlock>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default Index;
