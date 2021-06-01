import turtle as t
import random
height = 360
width = 360
screen = t.Screen()
screen.screensize(height, width)
n=0
t.bgpic("sunshine 360.png")

bask=t.Turtle()
bask.penup()
bask.color('black')
bask.setpos(-250,-250)
bask.shape('square')
bask.shapesize(1,6,1)
bask.speed('slow')

colours=['sky blue','green','blue','pink','yellow','grey','orange','magenta']

scoreb=t.Turtle()
scoreb.hideturtle()
scoreb.penup()
scoreb.setpos(250,210)
score=0
end=t.Turtle()
end.hideturtle()
#scoreb.write(score,font=('Lucida',16,'bold'))
started=False
def right_move():
    bask.forward(40)
def left_move():
    bask.forward(-40)

def create(egg):
    egg.hideturtle()
    egg.speed('fastest')
    egg.color(colours[random.randint(0,7)])
    egg.penup()
    egg.sety(300)
    egg.shape('circle')
    egg.shapesize(2,4,1)
    egg.setheading(270)
    egg.speed('normal')
    
def catch(egg,c):
    global score
    c=c+1
    egg.hideturtle()
    egg.right(90)
    score=score+1
    scoreb.clear()
    scoreb.write(score,font=('Lucida',16,'bold'))
    return c

def finish():
    end.setpos(0,0)
    end.write('Game over',align='center',font=('Lucida',25,'bold'))
    end.penup()
    end.setpos(0,-50)
    end.write('Your score is '+ str(score),align='center',font=('Lucida',25,'bold'))
    started=False
    global n
    n=0
def create_n_move():
    end.clear()
    global started
    global n
    n=n+1
    started=True
    if started==True and n==1:
        global score
        score=0
        scoreb.clear()
    if started:
        egg=t.Turtle()
        create(egg)
        egg.setx(random.randint(-320, 0))
        egg.showturtle()
        
        egg1=t.Turtle()
        create(egg1)
        egg1.setx(random.randint(0, 320))
        egg1.showturtle()
        
        c=0
        while(c!=2):
            egg.forward(50)
            if(egg.distance(bask)<55):
                c=catch(egg,c)
                
            screen.delay(20)
            egg1.forward(30)
            if(egg1.distance(bask)<55):
                c=catch(egg1,c)
            
            if(egg.position()[1]<-250):
                egg1.hideturtle()
                finish()
                return
            
            elif(egg1.position()[1]<-250):
                egg.hideturtle()
                finish()
                return
                   
        create_n_move()
   
#create_n_move()
end.write('Press space to start',align='center',font=('Lucida',25,'bold'))
t.onkey(right_move,'Right')
t.onkey(left_move,'Left')
t.onkey(create_n_move,'space')
t.listen()
t.mainloop()
