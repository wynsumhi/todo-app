show databases;
use kdt;

CREATE TABLE todo (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    done tinyint(1) NOT NULL DEFAULT 0
  );

-- 구조확인
DESC todo;

-- 데이터 확인
SELECT * FROM todo;

-- 데이터추가
INSERT INTO todo (id, title, done) VALUES (1, 'sean todo1', 1);
INSERT INTO todo VALUES (null, 'my todo2', 1);
INSERT INTO todo VALUES (null, 'my todo3', 1);
INSERT INTO todo VALUES (null, 'my todo4', 0);
INSERT INTO todo VALUES (null, 'my todo5', 1);
INSERT INTO todo VALUES (null, 'my todo6', 0);

 -- 컬럼 수정 (MODIFY)
ALTER TABLE todo MODIFY new_column INT;