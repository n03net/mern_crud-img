import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import BookRoute from './routes/BookRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(BookRoute);

app.listen(5000, () => {
    console.log('Server running...');
});

from tkinter import *
from tkinter import filedialog, messagebox
from cryptography.fernet import Fernet
import os
root = Tk()
class WindowDraggable():
    def _init_(self, label):
        self.label = label
        label.bind('<ButtonPress-1>', self.StartMove)
        label.bind('<ButtonRelease-1>', self.StopMove)
        label.bind('<B1-Motion>', self.OnMotion)
    def StartMove(self, event):
        self.x = event.x
        self.y = event.y
    def StopMove(self, event):
        self.x = None
        self.y = None
    def OnMotion(self, event):
        x = (event.x_root - self.x - self.label.winfo_rootx() + self.label.winfo_rootx())
        y = (event.y_root - self.y - self.label.winfo_rooty() + self.label.winfo_rooty())
        root.geometry("+%s+%s" %(x, y))

class Decrypt:
    def _init_(self, parent, title):
        self.parent = parent
        self.parent.title(title)
        lebar = 630
        tinggi = 200
        setTengahX = (self.parent.winfo_screenwidth() - lebar) // 2
        setTengahY = (self.parent.winfo_screenheight() - tinggi) // 2
        self.parent.geometry("%ix%i+%i+%i" %(lebar, tinggi, setTengahX, setTengahY))
        self.parent.configure(bg = "#75a3a3")
        self.aturKomponen()
 
    def buka(self, event = None):
        self.deiconify()

    def proses(self, event = None):        
        # key = self.entryKeyfile.get()

        def decrypt_file(filename, key):            
            f = Fernet(key)
            with open(filename, 'rb') as file:
                encrypted_data = file.read()
            dencrypted_data = f.decrypt(encrypted_data)
            with open(filename[:-5], 'wb') as file:
                file.write(dencrypted_data)

        def decrypt_dir(path, key):
            for root, dirs, files in os.walk(path):
                for filename in files:
                    if filename.endswith('.test'):
                        filepath = os.path.join(root, filename)
                        decrypt_file(filepath, key)
                        os.remove(filepath)

        keyfile = self.entryKeyfile.get()
        key_file = os.path.abspath(os.path.expanduser(keyfile))

        if os.path.isfile(key_file):
            with open(key_file, 'rb') as key_file:
                key = key_file.read()

            document_path = os.path.expanduser("~\\Documents")
            d_path = "D:\\"
            path_list = [document_path, d_path]

            for path in path_list:
                if os.path.isdir(path):
                    decrypt_dir(path, key)
                    print("Berhasil")
                    messagebox.showwarning("Peringatan", "Berhasil, horeeee")
                else:
                    print("Gagal")
                    messagebox.showwarning("Peringatan", "Yahh, gagal")
        else:
            print("Tidak ditemukan")
            messagebox.showwarning("Peringatan", "Tidak ditemukan bro filenya")

        

    def browse_folder(self):
        filetypes = (
            ('all files', '.'),
            ('text files', '*.txt'),
            ('Python files', '*.py'),
            ('Image files', '.jpg;.png'),
        )

        filename = filedialog.askopenfilename(
            title='Open a file',
            initialdir='/',
            filetypes=filetypes
        )

        if filename:
            self.entryKeyfile.delete(0, END)
            self.entryKeyfile.insert(0, filename)

    def pro(self, event):
        self.proses()

    def aturKomponen(self):
        frameUtama = Frame(root, width=350, height=200, bg="#75a3a3")
        frameUtama.grid(row=0, column=1)
        WindowDraggable(frameUtama)

        self.labelKeyfile = Label(frameUtama, text="Keyfile ", bg="#c2d6d6", fg="black", font=("Helvetica", 12), width=13, height=2)
        self.labelKeyfile.grid(row=1, column=1, pady=15, padx=15)

        self.entryKeyfile = Entry(frameUtama, fg="black", bg="#c2d6d6", font=("Helvetica", 12), width=40, bd=11, relief=FLAT)
        self.entryKeyfile.grid(row=1, column=2)
        self.entryKeyfile.focus_set()

        self.fileButton = Button(frameUtama, text="Browse", command=self.browse_folder, fg="white", bg="#0066ff", width=10, height=2, bd=0, activebackground="whitesmoke", activeforeground="#444")
        self.fileButton.grid(row=1, column=3, pady=8, sticky="w")

        self.labelNote = Label(frameUtama, text="Note: ", bg="#75a3a3", fg="red", font=("Helvetica", 12), width=12, height=2)
        self.labelNote.grid(row=2, column=1)

        self.labelNote = Label(frameUtama, text="Keyfile will be same", fg="red", bg="#75a3a3", font=("Helvetica", 12), width=40, bd=11, relief=FLAT)
        self.labelNote.grid(row=2, column=2, pady=6)

        self.buttonKeyfile = Button(frameUtama, text="Decrypt Folder", command=self.proses, fg="white", bg="#0066ff", width=12, height=2, bd=0, activebackground="whitesmoke", activeforeground="#444")
        self.buttonKeyfile.grid(row=3, column=2, pady=6, sticky="e")

def main():
    Decrypt(root, ":: Decrypt ::")
    Decrypt.buka(root)
    root.mainloop()
main()
