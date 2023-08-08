'use client'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer () {

    return (

        <footer className="p-4 w-full mt-auto h-fit flex flex-col justify-center items-center opacity-50 gap-2">

            <h3>Desenvolvido por Gustavo Targino</h3>

        <section className='flex justify-center items-center gap-5'>

    <a href='https://www.linkedin.com/in/gustavo-targino-7a6a82243/' target='_blank'>
            <LinkedInIcon sx={{fontSize:'2rem'}}/>
        </a>

        <a href='https://github.com/Gustavo-Targino' target='_blank'>
            <GitHubIcon sx={{fontSize:'2rem'}}/>
        </a>

        </section>

        </footer>




    )


}