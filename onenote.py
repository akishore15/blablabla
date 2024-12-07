import tkinter as tk
from tkinter import messagebox, simpledialog

class OneNoteApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Python OneNote")
        self.notes = {}
        
        self.notes_listbox = tk.Listbox(root)
        self.notes_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=1)
        self.notes_listbox.bind('<<ListboxSelect>>', self.show_note)
        
        self.text_area = tk.Text(root)
        self.text_area.pack(side=tk.RIGHT, fill=tk.BOTH, expand=1)

        self.menu_bar = tk.Menu(root)
        self.root.config(menu=self.menu_bar)

        file_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="New Note", command=self.new_note)
        file_menu.add_command(label="Save Note", command=self.save_note)
        file_menu.add_command(label="Delete Note", command=self.delete_note)

    def new_note(self):
        title = simpledialog.askstring("Note Title", "Enter the title of the note:")
        if title:
            self.notes[title] = ""
            self.notes_listbox.insert(tk.END, title)

    def save_note(self):
        selected_note = self.notes_listbox.curselection()
        if selected_note:
            note_title = self.notes_listbox.get(selected_note)
            self.notes[note_title] = self.text_area.get(1.0, tk.END).strip()
            messagebox.showinfo("Save Note", "Note saved successfully!")
        else:
            messagebox.showwarning("Save Note", "Please select a note to save!")

    def show_note(self, event):
        selected_note = self.notes_listbox.curselection()
        if selected_note:
            note_title = self.notes_listbox.get(selected_note)
            self.text_area.delete(1.0, tk.END)
            self.text_area.insert(tk.INSERT, self.notes[note_title])

    def delete_note(self):
        selected_note = self.notes_listbox.curselection()
        if selected_note:
            note_title = self.notes_listbox.get(selected_note)
            del self.notes[note_title]
            self.notes_listbox.delete(selected_note)
            self.text_area.delete(1.0, tk.END)
            messagebox.showinfo("Delete Note", "Note deleted successfully!")
        else:
            messagebox.showwarning("Delete Note", "Please select a note to delete!")

if __name__ == "__main__":
    root = tk.Tk()
    app = OneNoteApp(root)
    root.mainloop()
