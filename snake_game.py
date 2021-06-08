import random
import turtle as t
t.hideturtle()
t.bgcolor('black')
catp=t.Turtle()
catp.shape('square')
catp.color('chartreuse')
catp.speed('fastest')

bait=t.Turtle()
bait.shape('circle')
bait.color('red')
bait.speed('fast')

text=t.Turtle()
text.pencolor('yellow')
text.write('Press space to start',align='center',font=('Lucida',16,'bold'))
text.hideturtle()

score_tur=t.Turtle()
score_tur.hideturtle()
score_tur.pencolor('yellow')
score_tur.penup()
score_tur.setpos(((t.window_width()/2)-60),(t.window_height()/2)-60)
score_tur.write('0',align='right',font=('Lucida',16,'bold'))
start=False

def bait_pos():
    bait.penup()
    bait.hideturtle()
    bait.setx(random.randint(-200, 200))
    bait.sety(random.randint(-200, 200))
    bait.pendown()
    bait.showturtle()
def out():
    x,y= catp.pos()
    if x>(t.window_width()/2) or x<(-t.window_width()/2) or y>(t.window_height()/2) or y<(-t.window_height()/2):
        return 1
    else:
        return 0
def right_move():
    if catp.heading()==90:
        catp.right(90)
    else:
        catp.left(90)
def left_move():
    if catp.heading()==90:
        catp.left(90)
    else:
        catp.right(90)
def up_move():
    if catp.heading()==0:
        catp.left(90)
    else:
        catp.right(90)
def down_move():
    if catp.heading()==0:
        catp.right(90)
    else:
        catp.left(90)
        
def start_game():
    global start
    score=0
    start=True
    text.clear()
    if start:
        cat_len=2
        catp.speed='fastest'
        bait_pos()
        i=0
        while True:
            i=i+1
            catp.penup()
            catp.shapesize(1,cat_len,1)
            catp.forward(1)
            if catp.distance(bait)<(20+(2*cat_len)):
                bait_pos()
                score=score+1
                cat_len=cat_len+1
                score_tur.clear()
                score_tur.write(score*10,font=('Lucida',16,'bold'))
                print(score)
            if out():
                text.write('Game over',align='center',font=('Lucida',16,'bold'))
                score_tur.hideturtle()
                score_tur.penup()
                score_tur.setpos(-40,-40)
                score_tur.write('            Your score is '+ str(score*10),align='center',font=('Lucida',16,'bold'))
                break

t.onkey(start_game,'space')
t.onkey(right_move,'Right')
t.onkey(left_move,'Left')
t.onkey(up_move,'Up')
t.onkey(down_move,'Down')
t.listen()
t.mainloop()


        
    