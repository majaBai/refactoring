/*
封装程序中的所有可变数据, 能很容易看清楚数据被修改的地点和修改方式，
这样在需要更改数据结构时就非常方便

问题：只对集合变量的访问进行了封装，但依然让取值函数返回集合本身
方案；添加修改集合的方法---通常是“添加”和“移除”方法。这样就可使对集合的修改必须经过类
*/

class Person{
  constructor(name) {
    this.name = name
    this.courses = []
  }
  get name() {
    return this.name
  }
  get courses() {
    // return this.courses
    return this.courses.slice()
  }
  set courses(aList) {
    // this.courses = aList
    this.courses = aList.slice() // 有了 addCourse removeCourse 后，courses 的取值和设值方法就可以移除了
  }
  addCourse(aCourse) {
    this.courses.push(aCourse)
  }
  removeCourse(aCourse) {
    const index = this.courses.indexOf(aCourse)
    if(index === -1) {
      throw new Error('error')
    } else {
      this.courses.splice(index, 1)
    }
  }
}

class Course {
  constructor(name, isAdvanced) {
    this.name = name
    this.isAdvanced = isAdvanced
  }

  get name () {
    return this.name
  }
  get isAdvanced () {
    return this.isAdvanced
  }
}

const numAdvancedCourses = aPerson.courses.filter(c => c.isAdvanced).length

// aPerson.courses 的赋值操作
const basicCourseList = readBasicCourses(filename) // 获取基础课列表
// 为某人设置课程，方法1
aPerson.courses = basicCourseList.map(c => new Course(c, false)) 
// 为某人设置课程，方法2
for (const name of basicCourseList) {
  aPerson.courses.push(new Course(name, false)) // 绕过了设值函数，直接更改 courses 数据
}

// 方法3， 通过在 Person 类中添加 add 和 remove课程的函数
for (const name of basicCourseList) {
  aPerson.addCourse(new Course(name, false))
} 