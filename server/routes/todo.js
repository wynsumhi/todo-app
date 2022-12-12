const express = require("express");
const { Todo } = require("../models");
const router = express.Router();

// 기본주소 : localhost:PORT/
// GET localhost:PORT/todos = show all todos (READ)
router.get("/todos", async (req, res) => {
  // Todo.findAll().then((data) => {
  //   console.log(data);
  //   res.send(data);
  // });

  try {
    let data = await Todo.findAll();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// POST localhost:POST/todo - create a new todo (CREATE)
router.post("/todo", async (req, res) => {
  try {
    let newTodo = await Todo.create({
      title: req.body.title,
      // done:req.body.done -> default값 0
    });
    res.send(newTodo);
  } catch (err) {
    res.send(err);
  }
});

// PATCH localhost:PORT/todo/:todoId - edit a specific todo (UPDATE)
// 수정 성공시; true -> req.send(true)
// 수정 실패시; false -> req.send(false)
router.patch("/todo/:todoId", async (req, res) => {
  // console.log(req.body); // { title: 'my todo - 수정', done: true }
  // console.log(req.params); // { todoId: '1' }

  // Todo.update(
  //   {
  //     title: req.body.title,
  //     done: req.body.done,
  //   },
  //   {
  //     where: {
  //       id: req.params.todoId,
  //     },
  //   }
  // )
  //   .then((result) => {
  //     console.log(result); // 수정 성공시; [ 1 ] or 수정 실패시; [ 0 ]

  //     if (result[0]) {
  //       res.send(true);
  //     } else {
  //       res.send(false);
  //     }
  //     res.send('임시 응답');
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });

  try {
    let [isUpdated] = await Todo.update(
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: {
          id: req.params.todoId,
        },
      }
    );
    console.log(isUpdated);
    // 수정 성공시; [ 1 ] -> 1
    // 수정 실패시; [ 0 ] -> 0

    // !0
    if (!isUpdated) {
      return res.send(false);
    }

    res.send(true);
  } catch (err) {
    res.send(err);
  }
});

// DELETE localhost:PORT/todo/:todoId - remove a specific todo (DELETE)
// router.delete("/todo/:todoId", (req, res) => {
//   console.log(req.params); // {todoId: '8'}

//   Todo.destroy({
//     where: {
//       id: req.params.todoId,
//     },
//   }).then((result) => {
//     console.log(result) // 1 or 0
//     res.send('임시 응답')
//   })
// });

router.delete("/todo/:todoId", async (req, res) => {
  try {
    let isDeleted = await Todo.destroy({
      where: {
        id: req.params.todoId,
      },
    });
    // console.log(isDeleted); // 1 or 0

    // 삭제 실패 (!0)
    if (!isDeleted) {
      return res.send(false);
    }

    // 삭제 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
