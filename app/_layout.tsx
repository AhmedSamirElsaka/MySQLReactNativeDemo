// Prevent the splash screen from auto-hiding before asset loading is complete.

import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function RootLayout() {
  const [form, setForm] = useState({
    RollNo: "",
    StudentName: "",
    Course: "",
    FindRollNo: "",
  });

  const handleInsertSubmit = () => {
    if (form.RollNo && form.StudentName && form.Course) {
      var InsertAPIURL = "http://10.0.2.2:80/api/insert.php";
      var headers = {
        Accept: "application/json",
        "Content-Type": "application.json",
      };

      var data = {
        RollNo: form.RollNo,
        StudentName: form.StudentName,
        Course: form.Course,
      };

      fetch(InsertAPIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleSearchSubmit = () => {
    if (form.FindRollNo) {
      var InsertAPIURL = "http://10.0.2.2:80/api/search.php";
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var data = {
        FindRollNo: form.FindRollNo,
      };

      fetch(InsertAPIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setForm({
            ...form,
            StudentName: data[0].StudentName,
            Course: data[0].Course,
            RollNo: data[0].RollNo,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <View style={{ flex: 1, padding: 20, gap: 10 }}>
      <TextInput
        placeholder="FindRollNo"
        value={form.FindRollNo}
        onChangeText={(value) => setForm({ ...form, FindRollNo: value })}
      />
      <TextInput
        placeholder="RollNo"
        value={form.RollNo}
        onChangeText={(value) => setForm({ ...form, RollNo: value })}
      />
      <TextInput
        placeholder="Student Name"
        value={form.StudentName}
        onChangeText={(value) => setForm({ ...form, StudentName: value })}
      />
      <TextInput
        placeholder="Course"
        value={form.Course}
        onChangeText={(value) => setForm({ ...form, Course: value })}
      />

      <Button title="Submit" onPress={handleInsertSubmit} />
      <Button title="Search" onPress={handleSearchSubmit} />
    </View>
  );
}
