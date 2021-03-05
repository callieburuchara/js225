function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(this.name + ' is a ' + this.year + ' year student.');
    },

    addCourse(course) {
      this.courses.push(course);
      return course;
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, text) {
      let idx = this.courses.findIndex(course => course.code === code);
      if (this.courses[idx].note) {
        this.courses[idx].note += `; ${text}`;
      } else {
        this.courses[idx].note = text;
      }
      return text;
    },

    updateNote(code, text) {
      let idx = this.courses.findIndex(c => c.code === code);
      this.courses[idx].note = text;
    },

    viewNotes() {
      let noted = this.courses.filter(c => c.note);
      noted.forEach(course => {
        console.log(`${course.name}: ${course.note}`);
      });
      return noted;
    },
    
  }
}

let foo = createStudent('Foo', '1st');
foo.info();
console.log(foo.listCourses());
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses());
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
foo.updateNote(101, 'Fun course');
foo.viewNotes();
