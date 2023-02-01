# bmxparks-server
Back-end code for BMX Parks app


# add to parks initialize sql file once users are fully set up
FOREIGN KEY (user_id)
REFERENCES users (id)
  ON DELETE CASCADE