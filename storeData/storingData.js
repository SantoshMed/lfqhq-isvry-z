var fs = require('fs');

var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync('UserData/subscribe-data.json');
        return JSON.parse(noteString);
    } catch (e) {
    	return [];
    }
}

var saveNotes = (data) => {
	fs.writeFileSync('UserData/subscribe-data.json', JSON.stringify(data));
}

var updateNotes = (updateNote) => {
    var notes = fetchNotes();
    updateNote.forEach((note,index) => {
        notes[note.index].email = note.email;
        notes[note.index].feedback = note.feedback;
        notes[note.index].notification = note.notification;
    });
    saveNotes(notes);
}
var addNote = (email, feedback, notification) => {
    var notes = fetchNotes();
    var note = {
        email,
        feedback,
        notification
    }

    var duplicateNotes = notes.filter((note, index) => {       
        if (note.email.toLowerCase() === email.toLowerCase()) {
            note.email = email;
            note.feedback = feedback;
            note.notification = notification;
            note.index = index;
            return note;
        }
    });

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return 'Subscribed successfully';
    } else {
        updateNotes(duplicateNotes);
    	return 'Feedback Received';
    }
}

var getAll = () => {
    return fetchNotes();
}

var getNote = (name) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.email.toLowerCase() === email.toLowerCase());
    return filteredNotes[0];
}


module.exports = {
    addNote,
    getAll,
    getNote
}